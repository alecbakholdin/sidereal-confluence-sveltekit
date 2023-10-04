import { colonyMap, type Colony } from "$lib/types/cards/colony";
import type { ResearchTeam } from "$lib/types/cards/researchTeam.js";
import type { BidOrder, GameState } from "$lib/types/game";
import { fail } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const bidSchema = z.object({
    colonyShips: z.number().nonnegative(),
    researchTeamShips: z.number().nonnegative(),
})

const selectConfluenceCardSchema = z.object({
    cardType: z.enum(['Colony', 'Research Team']),
    cardIndex: z.number().nonnegative()
})

export async function load() {
    return {
        bidForm: await superValidate(bidSchema),
        selectConfluenceCardForm: await superValidate(selectConfluenceCardSchema),
    }
}

export const actions = {
    async setBid({ request, locals: { user, userPlayerInfo, gameState } }) {
        const form = await superValidate(request, bidSchema);
        if (!form.valid) return fail(400, { form });
        console.log(form.data);

        const shipsAvailable = userPlayerInfo.resources.find(({ resource, donation }) => resource === 'ship' && !donation)?.quantity || 0;
        if (form.data.colonyShips + form.data.researchTeamShips > shipsAvailable) {
            return message(form, "You do not have enough ships for that", { status: 400 });
        }

        const tiebreaker = userPlayerInfo.raceInfo.tiebreaker;
        gameState.colonyBidOrder = [...(gameState.colonyBidOrder || []), { user: user.id, shipsUsed: form.data.colonyShips, numCards: userPlayerInfo.colonies.length, tiebreaker }];
        gameState.researchTeamBidOrder = [...(gameState.researchTeamBidOrder || []), { user: user.id, shipsUsed: form.data.researchTeamShips, numCards: userPlayerInfo.researchTeams.length, tiebreaker }];

        // everyone has reserved their ships
        console.log(gameState);
        if (gameState.colonyBidOrder?.length === gameState.players.length) {
            gameState.colonyBidOrder = gameState.colonyBidOrder!.filter(x => x.shipsUsed).sort(bidOrderComparator);
            gameState.researchTeamBidOrder = gameState.researchTeamBidOrder!.filter(x => x.shipsUsed).sort(bidOrderComparator);

            if (gameState.colonyBidOrder?.length) gameState.colonyActiveBidder = 0;
            else if (gameState.researchTeamBidOrder?.length) gameState.researchTeamActiveBidder = 0;
            else endConfluence(gameState);
        }
    },

    async selectConfluenceCard({ request, locals: { gameState, userPlayerInfo, user } }) {
        const form = await superValidate(request, selectConfluenceCardSchema);
        if (!form.valid) return message(form, 'Unexpected form failure', { status: 400 });

        const { track, bidder, bidOrder } = form.data.cardType === 'Colony' ?
            { track: gameState.colonyBidTrack, bidder: gameState.colonyActiveBidder, bidOrder: gameState.colonyBidOrder } :
            { track: gameState.researchTeamBidTrack, bidder: gameState.researchTeamActiveBidder, bidOrder: gameState.researchTeamBidOrder };
        const trackObj = track[form.data.cardIndex];
        if (!trackObj || !trackObj?.card) {
            console.error(form.data);
            return message(form, "No card exists for this index", { status: 400 });
        }
        if (trackObj.reservedBy) {
            console.error(trackObj);
            return message(form, "This card has already been selected by another player", { status: 400 });
        }
        if (bidder === undefined || !bidOrder?.[bidder]) {
            console.error(bidOrder, bidder, form.data);
            return message(form, "No active bidder", { status: 500 });
        }
        const bidderObj = bidOrder[bidder]
        if (bidderObj.user !== user.id) return message(form, "It's not your turn to bid", { status: 400 });
        if (bidderObj.shipsUsed < trackObj.shipMinimum) return message(form, "You did not bet enough sihps", { status: 400 });

        const resourceAmount = userPlayerInfo.resources.find(x => x.resource === 'ship' && !x.donation)
        if (!resourceAmount || bidderObj.shipsUsed > resourceAmount.quantity) return message(form, "You do not have enough ships", { status: 400 });

        resourceAmount.quantity -= bidderObj.shipsUsed;
        trackObj.reservedBy = user.id;

        if (form.data.cardType === 'Colony') {
            const colony = trackObj.card as Colony;
            userPlayerInfo.colonies.push({
                cardId: colony.id,
                cardType: 'Colony',
                ownerId: user.id,
                upgraded: false,
                reservedConverters: [],
                colony
            })
        } else {
            const researchTeam = trackObj.card as ResearchTeam;
            userPlayerInfo.colonies.push({
                cardId: researchTeam.id,
                cardType: 'Research Team',
                ownerId: user.id,
                upgraded: false,
                reservedConverters: [],
                researchTeam
            })
        }

        if (form.data.cardType === 'Colony') {
            gameState.colonyActiveBidder = ((gameState.colonyActiveBidder! + 1) % gameState.colonyBidOrder!.length);
        } else {
            gameState.researchTeamActiveBidder = ((gameState.researchTeamActiveBidder! + 1) % gameState.researchTeamBidOrder!.length);
        }

        if (gameState.colonyActiveBidder === 0) {
            gameState.colonyActiveBidder = undefined;
            if (gameState.researchTeamBidOrder?.length) {
                gameState.researchTeamActiveBidder = 0;
            }
        } else if (gameState.researchTeamActiveBidder === 0) {
            gameState.researchTeamActiveBidder = 0;
        }
    }
}

function bidOrderComparator(a: BidOrder, b: BidOrder) {
    if (a.shipsUsed < b.shipsUsed) {
        return 1;
    } else if (a.shipsUsed > b.shipsUsed) {
        return -1;
    }
    if (a.numCards > b.numCards) {
        return 1;
    } else if (a.numCards < b.numCards) {
        return -1
    }
    return a.tiebreaker < b.tiebreaker ? 1 : -1;
}

function endConfluence(gameState: GameState) {
    gameState.turn++;
    gameState.phase = 0;
    gameState.colonyBidOrder = undefined;
    gameState.colonyActiveBidder = undefined;
    gameState.researchTeamBidOrder = undefined;
    gameState.researchTeamActiveBidder = undefined;

    const nextColonies = gameState.colonyBidTrack.filter(x => !x.reservedBy && x.shipMinimum !== 1).map(x => x.card);
    for (let i = 0; i < gameState.colonyBidTrack.length; i++) {
        const trackObj = gameState.colonyBidTrack[i];
        trackObj.reservedBy = undefined;
        if (i < nextColonies.length) trackObj.card = nextColonies[i];
        else trackObj.card = colonyMap[gameState.serverInfo!.colonyDeck.splice(0, 1)[0]];
    }

    const nextResearchTeams = gameState.researchTeamBidTrack.filter(x => !x.reservedBy && x.shipMinimum !== 1).map(x => x.card);
    for (let i = 0; i < gameState.researchTeamBidTrack.length; i++) {
        const trackObj = gameState.researchTeamBidTrack[i];
        trackObj.reservedBy = undefined;
        /* if(i < nextColonies.length) trackObj.card = nextColonies[i];
        else trackObj.card = colonyMap[gameState.serverInfo!.colonyDeck.splice(0, 1)[0]]; */
    }
}
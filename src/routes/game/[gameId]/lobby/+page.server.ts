import type { PlayerCard } from '$lib/types/cards/card.js';
import { colonyIds, colonyMap } from '$lib/types/cards/colony.js';
import { converterCards } from '$lib/types/cards/converterCard.js';
import { researchTeamIds, researchTeamMap } from '$lib/types/cards/researchTeam.js';
import {
	getColonyBidTrack,
	getResearchTeamBidTrack,
	getTurnsForPlayerCount,
	type GameState,
	type PlayerGameInfo
} from '$lib/types/game.js';
import { availableRaces, raceInfoMap } from '$lib/types/race.js';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const kickUserSchema = z.object({
	playerId: z.string()
});
const chooseRaceSchema = z.object({
	race: z.enum(availableRaces)
});
const emptySchema = z.object({});

export async function load() {
	return {
		kickUserForm: await superValidate(kickUserSchema),
		chooseRaceSchema: await superValidate(chooseRaceSchema),
		readyForm: await superValidate(emptySchema),
	};
}

export const actions = {
	async kickUser({ request, locals: { gameState, user } }) {
		const form = await superValidate(request, kickUserSchema);
		if (!form.valid) return fail(400, { form });
		if (user.id === form.data.playerId)
			return message(form, "Can't kick yourself", { status: 400 });
		gameState.players = gameState.players.filter((id) => id !== form.data.playerId);
		delete gameState.usernameMap[form.data.playerId];
		delete gameState.lobbyInfoMap[form.data.playerId];
		delete gameState.gameInfo[form.data.playerId];
	},
	async chooseRace({ request, locals: { gameState, user } }) {
		const form = await superValidate(request, chooseRaceSchema);
		if (!form.valid) return fail(400, { form });

		const { lobbyInfoMap } = gameState;
		if (lobbyInfoMap[user.id].ready)
			return message(form, 'Please unready before selecting a race', { status: 400 });
		const raceTaken = Object.entries(lobbyInfoMap).find(
			([playerId, { race, ready }]) => race === form.data.race && playerId !== user.id && ready
		);
		if (raceTaken)
			return message(form, 'This race has already been selected by someone else', { status: 400 });

		for (const lobbyInfo of Object.values(lobbyInfoMap)) {
			if (lobbyInfo.race === form.data.race) {
				lobbyInfo.race = undefined;
			}
		}
		lobbyInfoMap[user.id].race = form.data.race;
	},
	async toggleReady({ request, locals: { gameState, user } }) {
		const form = await superValidate(request, emptySchema);
		if (!form.valid) return fail(400, { form });

		if (!gameState.lobbyInfoMap[user.id].race)
			return message(form, 'Please select a race first', { status: 400 });
		gameState.lobbyInfoMap[user.id].ready = !gameState.lobbyInfoMap[user.id].ready;
	},
	async startGame({ request, locals: { gameState } }) {
		const form = await superValidate(request, z.object({}));
		const allReady = !Object.values(gameState.lobbyInfoMap).find(({ ready }) => !ready);
		if (!allReady)
			return message(form, 'Not everyone is ready. Wait until everyone is ready to start the game');

		setupConfluence(gameState);
		gameState.gameInfo = {};
		for (const playerId of gameState.players) {
			setupPlayer(gameState, playerId);
		}
		gameState.state = 'inProgress';
		gameState.turn = 0;
		gameState.phase = 0;
		gameState.phases = ['trade', 'economy', 'confluence'];

		throw redirect(308, `/game/${gameState.id}/game`);
	}
};

function setupPlayer(gameState: GameState, playerId: string) {
	const race = gameState.lobbyInfoMap[playerId].race!;
	const raceObj = raceInfoMap[race];
	const drawnColonies = gameState.serverInfo!.colonyDeck.splice(0, raceObj.startingColonies);
	const drawnResearchTeams = gameState.serverInfo!.researchTeamDeck.splice(
		0,
		raceObj.startingResearchTeams
	);
	const defaultCard: Pick<PlayerCard, 'ownerId' | 'upgraded' | 'reservedConverters'> = {
		ownerId: playerId,
		upgraded: false,
		reservedConverters: []
	};
	const playerGameInfo: PlayerGameInfo = {
		race,
		raceInfo: raceObj,
		resources: [...(raceObj.startingResources || [])],
		colonies: drawnColonies.map((cardId) => ({
			...defaultCard,
			cardId,
			cardType: 'Colony',
			caylionDoubled: race === 'Caylion'
		})),
		converterCards: converterCards
			.filter((x) => x.race === race && x.isStartingCard)
			.map(({ id }) => ({
				...defaultCard,
				cardId: id,
				cardType: 'Converter'
			})),
		researchTeams: drawnResearchTeams.map((cardId) => ({
			...defaultCard,
			cardId,
			cardType: 'Research Team'
		})),
		ready: false
	};
	gameState.gameInfo[playerId] = playerGameInfo;
}

function setupConfluence(gameState: GameState) {
	const numPlayers = gameState.players.length;
	gameState.turns = getTurnsForPlayerCount(numPlayers);

	// confluence decks
	gameState.serverInfo = {
		colonyDeck: [...colonyIds].sort(() => Math.random() - 0.5),
		researchTeamDeck: [...researchTeamIds]
			.sort(() => Math.random() - 0.5)
			.sort((a, b) => researchTeamMap[a].era! - researchTeamMap[b].era!)
	};

	const kjasModifier = Object.values(gameState.lobbyInfoMap).find(
		({ race }) => race === 'Kjasjavikalimm'
	)
		? 1
		: 0;
	const numColonies = numPlayers + kjasModifier;
	gameState.colonyBidTrack = getColonyBidTrack(numColonies);
	for (const bidTrack of gameState.colonyBidTrack) {
		const colonyId: string = gameState.serverInfo!.colonyDeck.splice(0, 1)[0];
		bidTrack.cardId = colonyId;
	}

	const numResearchTeams = numPlayers;
	gameState.researchTeamBidTrack = getResearchTeamBidTrack(numResearchTeams);
	for (const bidTrack of gameState.researchTeamBidTrack) {
		const researchTeamId: string = gameState.serverInfo!.researchTeamDeck.splice(0, 1)[0];
		bidTrack.cardId = researchTeamId;
	}
}

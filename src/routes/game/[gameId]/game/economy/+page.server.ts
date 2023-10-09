import type { CardWrapper, PlayerCard } from '$lib/types/cards/card';
import { mergeEntityContainers, resolveResourceUpdate } from '$lib/types/entityContainer.js';
import type { GameState, PlayerGameInfo } from '$lib/types/game.js';
import { getCardWrapper, getReservedConverters } from '$lib/util/client/cardWrapper';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const MarkForEconomySchema = z.object({
	cardId: z.string(),
	converterNumber: z.number(),
	status: z.boolean()
});

const UpgradeSchema = z.object({
	cardId: z.string(),
	optionNumber: z.number().nonnegative()
});

export async function load() {
	return {
		markForEconomyForm: await superValidate(MarkForEconomySchema),
		upgradeForm: await superValidate(UpgradeSchema)
	};
}

export const actions = {
	async markForEconomy({ request, locals: { userPlayerInfo } }) {
		const form = await superValidate(request, MarkForEconomySchema);
		if (!form.valid) return fail(400, { form });

		const card = getCardFromInfo(userPlayerInfo, form.data.cardId);
		if (!card) return message(form, 'You do not own this card', { status: 403 });

		card.markForEconomy(form.data.converterNumber, form.data.status);
		return message(form, 'Success!');
	},
	async upgrade({ request, locals: { userPlayerInfo } }) {
		const form = await superValidate(request, UpgradeSchema);
		console.log(form.data);

		const card = getCardFromInfo(userPlayerInfo, form.data.cardId);
		if (!card) return message(form, 'You do not own this card', { status: 403 });

		const { converter, technology } = card.upgrade(form.data.optionNumber);
		if (converter) {
			resolveResourceUpdate(userPlayerInfo, converter.input, converter.output);
		} else if (technology) {
			return message(form, 'Upgrading using technologies is not supported yet', { status: 400 });
		}
		return message(form, 'Success!');
	},
	async resolveEconomy({locals: {gameState, userPlayerInfo}}) {
		const phase = gameState.phases[gameState.phase];
		if(phase !== 'economy') return fail(400, {message: `It's not economy, it's ${phase}`});
		if(userPlayerInfo.ready) return fail(400, {message: 'You already resolved your economy step'});

		const reservedConverters = getReservedConverters(userPlayerInfo);
		const input = mergeEntityContainers(...reservedConverters.map(x => x.input));
		const output = mergeEntityContainers(...reservedConverters.map(x => x.output));

		resolveResourceUpdate(userPlayerInfo, input, output);

		userPlayerInfo.ready = true;
		advancePhaseIfNecessary(gameState);
	}
};

function advancePhaseIfNecessary(gameState: GameState) {
	const allReady = !Object.values(gameState.gameInfo).find(x => !x.ready);
	if(allReady) {
		gameState.phase += 1;
	}
	Object.values(gameState.gameInfo).forEach(x => x.ready = false);
}

function getCardFromInfo(
	{ colonies, converterCards, researchTeams }: PlayerGameInfo,
	cardId: string
): CardWrapper<any> | undefined {
	const card =
		findCardInArray(colonies, cardId) ??
		findCardInArray(converterCards, cardId) ??
		findCardInArray(researchTeams, cardId);
	return card && getCardWrapper(card);
}

function findCardInArray(cards: PlayerCard[], cardId: string): PlayerCard | undefined {
	return cards.find(({ cardId: x }) => x === cardId);
}

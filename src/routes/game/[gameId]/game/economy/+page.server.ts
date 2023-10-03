import { getCardWrapper, type CardWrapper, type PlayerCard } from '$lib/types/cards/card.js';
import { ColonyCardWrapper } from '$lib/types/cards/colony.js';
import { resolveResourceUpdate } from '$lib/types/entityContainer.js';
import type { PlayerGameInfo } from '$lib/types/game.js';
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

		const { input, output } = card.upgrade(form.data.optionNumber);
		resolveResourceUpdate(userPlayerInfo, input, output);
		return message(form, 'Success!');
	}
};

function getCardFromInfo(
	{ colonies, converterCards, researchTeams }: PlayerGameInfo,
	cardId: string
): CardWrapper | undefined {
	const card =
		findCardInArray(colonies, cardId) ??
		findCardInArray(converterCards, cardId) ??
		findCardInArray(researchTeams, cardId);
	return card && getCardWrapper(card);
}

function findCardInArray(cards: PlayerCard[], cardId: string): PlayerCard | undefined {
	return cards.find(({ cardId: x }) => x === cardId);
}

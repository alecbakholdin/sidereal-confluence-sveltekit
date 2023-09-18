import { pusher } from '$lib/objects.server.js';
import type { PlayerGameInfo } from '$lib/types/game.js';
import type { ResourceAmount, ResourceType } from '$lib/types/resource.js';
import {
	tradePreferencesSchema,
	tradeProposalSchema,
	type EntityContainer
} from '$lib/types/trade';
import { TRADE_PROPOSAL_EVENT, presenceChannel } from '$lib/util/pusherChannels.js';
import { fail } from '@sveltejs/kit';
import { findSourceMap } from 'module';
import { message, superValidate } from 'sveltekit-superforms/server';

export async function load({ locals: { gameState, user } }) {
	const updateTradePreferencesForm = await superValidate(tradePreferencesSchema);
	const userInfo = gameState.gameInfo[user.id];
	if (userInfo.tradePreferences) {
		updateTradePreferencesForm.data = userInfo.tradePreferences;
	}

	return {
		updateTradePreferencesForm,
		tradeProposalForm: await superValidate(tradeProposalSchema)
	};
}

export const actions = {
	async updateTradePreferences({ request, locals: { gameState, user } }) {
		const form = await superValidate(request, tradePreferencesSchema);
		if (!form.valid) return fail(400, { form });

		const userObj = gameState.gameInfo[user.id];
		if (!userObj) return fail(500, { form });

		userObj.tradePreferences = form.data;
	},

	async proposeTrade({ request, locals: { gameState, user } }) {
		const form = await superValidate(request, tradeProposalSchema);
		if (!form.valid) return fail(400, { form });

		const userObj = gameState.gameInfo[user.id];
		if (!userObj) return message(form, 'User is not part of this game', { status: 400 });

		console.log(form.data);
		pusher.trigger(presenceChannel(gameState.id), TRADE_PROPOSAL_EVENT, form.data);
		pusher.sendToUser(form.data.destPlayerId, TRADE_PROPOSAL_EVENT, form.data);
	},

	async confirmTrade({ request, locals: { gameState, user } }) {
		const form = await superValidate(request, tradeProposalSchema);
		if (!form.valid) return fail(400, { form });

		const srcUserObj = gameState.gameInfo[form.data.srcPlayerId];
		const destUserObj = gameState.gameInfo[form.data.destPlayerId];

		function getUserResourceObj(info: PlayerGameInfo, resource: ResourceType) {
			const obj = info.resources.find((a) => a.resource === resource);
			if (obj) return obj;
			const newObj = { resource, quantity: 0 } as ResourceAmount;
			info.resources.push(newObj);
			return newObj;
		}

		function entityContainerToResourceArray(container: EntityContainer) {
			const arr = Object.entries(container.resource) as [ResourceType, number][];
			return arr.filter(([_, qty]) => qty);
		}

		for (const [resource, qty] of entityContainerToResourceArray(form.data.offering)) {
			getUserResourceObj(srcUserObj, resource).quantity -= qty;
			getUserResourceObj(destUserObj, resource).quantity += qty;
		}
		for (const [resource, qty] of entityContainerToResourceArray(form.data.askingFor)) {
			getUserResourceObj(srcUserObj, resource).quantity += qty;
			getUserResourceObj(destUserObj, resource).quantity -= qty;
		}

		if (srcUserObj.resources.find(({ quantity }) => quantity < 0)) {
			return message(
				form,
				`${
					gameState.usernameMap[form.data.srcPlayerId]
				} does not have enough resources for this trade.`,
				{ status: 400 }
			);
		}
		if (destUserObj.resources.find(({ quantity }) => quantity < 0)) {
			return message(
				form,
				`${
					gameState.usernameMap[form.data.destPlayerId]
				} does not have enough resources for this trade.`,
				{ status: 400 }
			);
		}
	}
};

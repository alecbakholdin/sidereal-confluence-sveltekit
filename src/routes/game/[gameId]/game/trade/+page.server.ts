import { tradeInfoSchema, tradePreferencesSchema } from '$lib/types/trade';
import { fail } from '@sveltejs/kit';
import { error } from 'console';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

export async function load({locals: {gameState, user}}) {
	const updateTradePreferencesForm = await superValidate(tradePreferencesSchema);
    const userInfo = gameState.gameInfo[user.id];
    if(userInfo.tradePreferences) {
        updateTradePreferencesForm.data = userInfo.tradePreferences;
    }
	return {
		updateTradePreferencesForm
	};
}

export const actions = {
	async updateTradePreferences({ request, locals: { gameState, user } }) {
		const form = await superValidate(request, tradePreferencesSchema);
		if (!form.valid) return fail(400, { form });

		const userObj = gameState.gameInfo[user.id];
		if (!userObj) return fail(500, { form });

		userObj.tradePreferences = form.data;
	}
};

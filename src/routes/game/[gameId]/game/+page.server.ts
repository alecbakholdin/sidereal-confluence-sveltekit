import { error, fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

export async function load({ url }) {
	throw redirect(308, url.pathname + '/trade');
}

export const actions = {
	async readyUp({ locals: { userPlayerInfo } }) {
		userPlayerInfo.ready = true;
	},
	async unready({ locals: { userPlayerInfo } }) {
		userPlayerInfo.ready = false;
	},
	async nextPhase({ request, locals: { gameState, userPlayerInfo } }) {
		const form = await superValidate(request, z.object({}));

		if (gameState.phases[gameState.phase] === 'confluence') {
			return message(form, "Confluence cannot be skipped", {status: 400});
		}

		const playerInfos = Object.values(gameState.gameInfo);
		userPlayerInfo.ready = true;
		const allReady = !playerInfos.find(({ ready }) => !ready);
		if (!allReady) throw error(400, { message: 'Not everyone is ready' });

		gameState.phase = (gameState.phase + 1) % gameState.phases.length;
		if (gameState.phase === 0) gameState.turn += 1;
		playerInfos.forEach((gameInfo) => (gameInfo.ready = false));
	}
};

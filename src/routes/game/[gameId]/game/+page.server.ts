import { error, fail, redirect } from '@sveltejs/kit';

export async function load({ url }) {
	throw redirect(308, url.pathname + '/trade');
}

export const actions = {
	async readyUp({ locals: { userPlayerInfo, gameState } }) {
		const phase = gameState.phases[gameState.phase];
		if (phase === 'confluence' || phase === 'economy') {
			return fail(400, { message: `Cannot ready up during ${phase}` });
		}

		userPlayerInfo.ready = true;
	},
	async unready({ locals: { userPlayerInfo } }) {
		userPlayerInfo.ready = false;
	},
	async nextPhase({ locals: { gameState, userPlayerInfo } }) {
		const phase = gameState.phases[gameState.phase];
		if (phase === 'confluence' || phase === 'economy') {
			return fail(400, { message: ` ${phase} cannot be skipped` });
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

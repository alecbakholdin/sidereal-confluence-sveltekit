import { error, redirect } from '@sveltejs/kit';
import { message } from 'sveltekit-superforms/server';

export async function load({ url }) {
	throw redirect(308, url.pathname + '/trade');
}

export const actions = {
	async readyUp({locals: {userPlayerInfo}}) {
		userPlayerInfo.ready = true;
	},
	async unready({locals: {userPlayerInfo}}) {
		userPlayerInfo.ready = false;
	},
	async nextPhase({locals: {gameState}}) {
		const playerInfos = Object.values(gameState.gameInfo);
		const allReady = !playerInfos.find(({ready}) => !ready);
		if(!allReady) throw error(400, {message: "Not everyone is ready"});

		gameState.phase = (gameState.phase + 1) % gameState.phases.length;
		if(gameState.phase === 0)
			gameState.turn += 1;
		playerInfos.forEach((gameInfo) => gameInfo.ready = false);
	}
}
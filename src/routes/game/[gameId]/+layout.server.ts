import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	const { gameState } = locals;
	if (!gameState) {
		throw error(404, { message: 'Game does not exist' });
	}

	return {
		gameState
	};
}

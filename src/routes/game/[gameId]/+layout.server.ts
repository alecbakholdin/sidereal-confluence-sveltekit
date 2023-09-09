import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	const { gameState, user } = locals;
	if (!gameState) throw error(404, { message: 'Game does not exist' });
	if (!user) throw error(401, { message: 'User is not authenticated' });
	if(!gameState.players.includes(user.id)) {
		gameState.players.push(user.id);
	}

	return {
		gameState
	};
}

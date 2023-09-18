import { pusher } from '$lib/objects.server';
import { error, json } from '@sveltejs/kit';

export async function POST({ request, locals: { user, gameState } }) {
	const body = await request.formData();
	const socketId = body.get('socket_id')?.toString();
	if (!socketId) throw error(400, { message: 'missing socketId' });

	if (!user || !gameState) throw error(400, { message: 'User or game state not present' });

	const userId = socketId.split('-')[3];
	if (gameState.players.includes(user.id) && (!userId || user.id === userId)) {
		const authResponse = pusher.authenticateUser(socketId, { id: user.id, user_info: user });
		return json(authResponse);
	}
	throw error(403, { message: 'Not authorized' });
}

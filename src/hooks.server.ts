import { PUSHER_SECRET } from '$env/static/private';
import { PUBLIC_PUSHER_APP_ID, PUBLIC_PUSHER_CLUSTER, PUBLIC_PUSHER_KEY } from '$env/static/public';
import { getGameState, setGameState } from '$lib/util/gameState.server';
import { UPDATE_EVENT, updateChannel } from '$lib/util/pusherChannels';
import { diff } from 'json-diff-ts';
import Pusher from 'pusher';


const pusher = new Pusher({
	appId: PUBLIC_PUSHER_APP_ID,
	key: PUBLIC_PUSHER_KEY,
	secret: PUSHER_SECRET,
	cluster: PUBLIC_PUSHER_CLUSTER
});

export async function handle({ event, resolve }) {
	const { gameId } = event.params;
	if (!gameId) return await resolve(event);

	const gameState = await getGameState(gameId);
	if (!gameState) return await resolve(event);

	event.locals.gameState = gameState;
	const oldState = JSON.parse(JSON.stringify(gameState));

	const response = await resolve(event);

	const newState = event.locals.gameState;
	const difference = diff(oldState, newState);
	if (difference.length) {
		pusher.trigger(updateChannel(gameId), UPDATE_EVENT, difference);
		await setGameState(gameId, newState);
	}

	return response;
}
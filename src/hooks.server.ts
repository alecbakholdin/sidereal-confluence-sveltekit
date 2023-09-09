import { AUTH_SECRET, PUSHER_SECRET } from '$env/static/private';
import { PUBLIC_PUSHER_APP_ID, PUBLIC_PUSHER_CLUSTER, PUBLIC_PUSHER_KEY } from '$env/static/public';
import { createNewUser } from '$lib/types/user';
import { UPDATE_EVENT, updateChannel } from '$lib/util/pusherChannels';
import { getGameState, setGameState } from '$lib/util/server/gameState.server';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { diff } from 'json-diff-ts';
import { decode, sign, verify } from 'jsonwebtoken';
import Pusher from 'pusher';

const handleAuth: Handle = async ({event, resolve}) => {
	const authHeader = event.cookies.get("Authorization");
	
	if(!authHeader) {
		const user = createNewUser();
		const payload = sign({data: user}, AUTH_SECRET);
		event.cookies.set("Authorization", payload);
	} else {
		const user = decode(authHeader)
	}

	return resolve(event);
}

const pusher = new Pusher({
	appId: PUBLIC_PUSHER_APP_ID,
	key: PUBLIC_PUSHER_KEY,
	secret: PUSHER_SECRET,
	cluster: PUBLIC_PUSHER_CLUSTER
});

const handleGame: Handle = async({ event, resolve }) => {
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

export const handle = sequence(handleAuth, handleGame);
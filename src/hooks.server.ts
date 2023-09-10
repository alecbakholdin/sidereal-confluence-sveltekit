import { AUTH_SECRET } from '$env/static/private';
import { pusher } from '$lib/objects.server';
import { createNewUser, type User } from '$lib/types/user';
import { UPDATE_EVENT, presenceChannel } from '$lib/util/pusherChannels';
import { getGameState, setGameState } from '$lib/util/server/gameState.server';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { diff } from 'json-diff-ts';
import jwt from 'jsonwebtoken';

const handleAuth: Handle = async ({ event, resolve }) => {
	const authHeader = event.cookies.get("Authorization");
	const payload = (authHeader && jwt.decode(authHeader));
	const user = (payload && (payload as any)?.data as User) || createNewUser();
	
	const resetJwt = () => {
		const payload = jwt.sign({ data: user }, AUTH_SECRET, {expiresIn: "12h"});
		event.cookies.set("Authorization", payload, {path: '/'});
	}
	if (!authHeader) {
		resetJwt();
	} else try {
		jwt.verify(authHeader, AUTH_SECRET);
	} catch (e) {
		resetJwt();
	}
	event.locals.user = user;

	return resolve(event);
}

const handleGame: Handle = async ({ event, resolve }) => {
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
		pusher.trigger(presenceChannel(gameId), UPDATE_EVENT, difference);
		await setGameState(gameId, newState);
	}

	return response;
}

export const handle = sequence(handleAuth, handleGame);
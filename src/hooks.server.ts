import { AUTH_SECRET } from '$env/static/private';
import { pusher } from '$lib/objects.server';
import type { GameState } from '$lib/types/game';
import { createNewUser, type User } from '$lib/types/user';
import { UPDATE_EVENT, presenceChannel } from '$lib/util/pusherChannels';
import { getGameState, setGameState } from '$lib/util/server/gameState.server';
import type { ActionResult, Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { diff } from 'json-diff-ts';
import jwt from 'jsonwebtoken';

const handleAuth: Handle = async ({ event, resolve }) => {
	const authHeader = event.cookies.get('Authorization');
	const payload = authHeader && jwt.decode(authHeader);
	const user = (payload && ((payload as any)?.data as User)) || createNewUser();

	const resetJwt = () => {
		console.log('resetting jwt to ' + JSON.stringify(user));
		const payload = jwt.sign({ data: user }, AUTH_SECRET, { expiresIn: '12h' });
		event.cookies.set('Authorization', payload, { path: '/', maxAge: 60 * 60 * 24 * 30 });
	};
	if (!authHeader) {
		resetJwt();
	} else
		try {
			jwt.verify(authHeader, AUTH_SECRET);
		} catch (e) {
			resetJwt();
		}
	event.locals.user = user;

	return resolve(event);
};

const handleGame: Handle = async ({ event, resolve }) => {
	console.log(event.url.toString());

	const { gameId } = event.params;
	if (!gameId) return await resolve(event);

	const gameState = await getGameState(gameId);
	if (!gameState) return await resolve(event);

	event.locals.gameState = gameState;
	event.locals.userPlayerInfo = gameState.gameInfo[event.locals.user.id];
	const oldState = JSON.parse(JSON.stringify(gameState));

	const response = await resolve(event);

	const newState = event.locals.gameState;
	const { serverInfo, ...newClientState } = newState;
	delete oldState.serverInfo;
	const serverDiff = diff(oldState.serverInfo, serverInfo);
	const clientDiff = diff(oldState, newClientState);
	if (
		(clientDiff.length || serverDiff.length) &&
		response.status < 400 &&
		!(await isFormFailure(response))
	) {
		if (clientDiff.length) {
			pusher.trigger(presenceChannel(gameId), UPDATE_EVENT, clientDiff);
		}
		await setGameState(gameId, newState);
	}

	return response;
};

async function isFormFailure(response: Response) {
	try {
		const content = (await response.clone().json()) as ActionResult;
		if (content?.type === 'failure') return true;
		return false;
	} catch (e) {
		return false;
	}
}

export const handle = sequence(handleAuth, handleGame);

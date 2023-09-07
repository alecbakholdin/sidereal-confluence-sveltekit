import { KV_REST_API_TOKEN, KV_REST_API_URL, PUSHER_SECRET } from '$env/static/private';
import { PUBLIC_PUSHER_APP_ID, PUBLIC_PUSHER_CLUSTER, PUBLIC_PUSHER_KEY } from '$env/static/public';
import { getDefaultGameState, type GameState } from '$lib/types/game';
import { UPDATE_EVENT, cacheChannel, updateChannel } from '$lib/util/pusherChannels';
import { createClient } from '@vercel/kv';
import { diff } from 'json-diff-ts';
import Pusher from 'pusher';

const kv = createClient({
	token: KV_REST_API_TOKEN,
	url: KV_REST_API_URL
});

const pusher = new Pusher({
	appId: PUBLIC_PUSHER_APP_ID,
	key: PUBLIC_PUSHER_KEY,
	secret: PUSHER_SECRET,
	cluster: PUBLIC_PUSHER_CLUSTER
});

export async function handle({ event, resolve }) {
	const { gameId } = event.params;
	if (!gameId) return await resolve(event);

	event.locals.gameState = await getGameState(gameId);
	const oldState = JSON.parse(JSON.stringify(event.locals.gameState));

	const response = await resolve(event);
	
	const newState = event.locals.gameState;
	const difference = diff(oldState, newState);
	if (difference.length) {
		pusher.trigger(updateChannel(gameId), UPDATE_EVENT, difference);
		await setGameState(gameId, newState);
	}

	return response;
}

async function getGameState(gameId: string) {
	const gameState = await kv.get<GameState>(`game:${gameId}`);
	if (!gameState) {
		const defaultState = getDefaultGameState();
		await setGameState(gameId, defaultState);
		return defaultState;
	}
	return gameState;
}

const ONE_DAY_TTL = 24 * 60 * 60;
async function setGameState(gameId: string, gameState: GameState) {
	return await kv.set<GameState>(`game:${gameId}`, gameState, { ex: ONE_DAY_TTL });
}

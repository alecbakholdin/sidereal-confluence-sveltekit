import { KV_REST_API_TOKEN, KV_REST_API_URL } from '$env/static/private';
import type { GameState } from '$lib/types/game';
import { createClient } from '@vercel/kv';

const kv = createClient({
	token: KV_REST_API_TOKEN,
	url: KV_REST_API_URL
});

export async function getGameState(gameId: string) {
	return kv.get<GameState>(`game:${gameId}`);
}

const ONE_DAY_TTL = 24 * 60 * 60;
export async function setGameState(gameId: string, gameState: GameState) {
	return kv.set<GameState>(`game:${gameId}`, gameState, { ex: ONE_DAY_TTL });
}

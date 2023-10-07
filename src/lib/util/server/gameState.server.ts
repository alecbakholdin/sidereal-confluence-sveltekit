import {
	KV_REST_API_TOKEN,
	KV_REST_API_URL,
	UPSTASH_REDIS_TOKEN,
	UPSTASH_REDIS_URL
} from '$env/static/private';
import type { GameState } from '$lib/types/game';
import { Redis } from '@upstash/redis/nodejs';
import { createClient } from '@vercel/kv';

const kv = createClient({
	token: KV_REST_API_TOKEN,
	url: KV_REST_API_URL
});

const upstashRedis = new Redis({
	url: UPSTASH_REDIS_URL,
	token: UPSTASH_REDIS_TOKEN
});

export async function getGameState(gameId: string) {
	//return kv.get<GameState>(`game:${gameId}`);
	return upstashRedis.get<GameState>(`game:${gameId}`);
}

const ONE_DAY_TTL = 24 * 60 * 60;
export async function setGameState(gameId: string, gameState: GameState) {
	//return kv.set<GameState>(`game:${gameId}`, gameState, { ex: ONE_DAY_TTL });
	return upstashRedis.set<GameState>(`game:${gameId}`, gameState, { ex: ONE_DAY_TTL });
}

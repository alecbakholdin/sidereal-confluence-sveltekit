import type { GameState, PlayerGameInfo } from '$lib/types/game';
import type { User } from '$lib/types/user';
import { getContext, setContext } from 'svelte';
import { derived, type Readable } from 'svelte/store';

export type GameContext = {
	gameState: Readable<GameState>;
	onlineMembers: Readable<User[]>;
	me: User;
	getUrl(path: string): string;
};

export function setGameContext(gameContext: GameContext) {
	setContext('gameContext', gameContext);
}
export function getGameContext(): GameContext {
	return getContext('gameContext');
}

export function getGameState(): Readable<GameState> {
	const gameContext = getGameContext();
	return gameContext.gameState;
}

export function getMyPlayerInfo(): Readable<PlayerGameInfo> {
	const gameContext = getGameContext();

	const gameState = getGameState();
	return derived(gameState, ({ gameInfo }) => gameInfo[gameContext.me.id]);
}

export function getMe() {
	const gameContext = getGameContext();
	return gameContext.me;
}

export function getRootGamePath(): string {
	const gameContext = getGameContext();
	return gameContext.getUrl('/game');
}

export function getPhase() {
	const gameState = getGameState();
	return derived(gameState, (state) => state.phases[state.phase]);
}

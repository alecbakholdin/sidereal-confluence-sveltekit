import type { GameState } from "$lib/types/game"
import type { User } from "$lib/types/user"
import { getContext, setContext } from "svelte"
import type { Readable } from "svelte/store"

export type GameContext = {
    gameState: Readable<GameState>,
    onlineMembers: Readable<User[]>,
    me: User,
    getUrl(path: string): string,
}

export function setGameContext(gameContext: GameContext) {
    setContext('gameContext', gameContext);
}
export function getGameContext(): GameContext {
    return getContext('gameContext');
}
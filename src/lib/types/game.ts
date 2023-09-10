import type { User } from "./user";

export type GameState = {
    id: string;
	state: 'lobby' | 'inProgress';
    players: string[];
    usernameMap: Record<string, string>;
};

export function getDefaultGameState(id: string): GameState {
    return {
        id,
        state: 'lobby',
        players: [],
        usernameMap: {}
    }
}
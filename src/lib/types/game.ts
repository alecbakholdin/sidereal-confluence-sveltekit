export type GameState = {
	state: 'lobby' | 'inProgress';
    players: string[];
};

export function getDefaultGameState(): GameState {
    return {
        state: 'lobby',
        players: []
    }
}
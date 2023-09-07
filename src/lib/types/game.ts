export type GameState = {
	state: 'lobby' | 'inProgress';
};

export function getDefaultGameState(): GameState {
    return {
        state: 'lobby'
    }
}
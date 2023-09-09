export type GameState = {
    id: string;
	state: 'lobby' | 'inProgress';
    players: string[];
};

export function getDefaultGameState(id: string): GameState {
    return {
        id,
        state: 'lobby',
        players: []
    }
}
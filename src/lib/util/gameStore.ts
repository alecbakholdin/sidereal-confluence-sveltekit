import { PUBLIC_PUSHER_KEY, PUBLIC_PUSHER_CLUSTER } from '$env/static/public';
import Pusher from 'pusher-js';
import { writable } from 'svelte/store';

const pusher = new Pusher(PUBLIC_PUSHER_KEY, { cluster: PUBLIC_PUSHER_CLUSTER });
export function joinGame(id: string) {
    console.log('joined game');
    const gameChannel = pusher.channel(`game${id}`);
}

export function leaveGame(id: string) {

}

export type GameState = {
    state: 'lobby' | 'inProgress'
}

const gameState = writable<GameState>({state: 'lobby'});
export const gameStateStore = {
    subscribe: gameState.subscribe,
    set: gameState.set
}

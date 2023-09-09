import { PUBLIC_PUSHER_KEY, PUBLIC_PUSHER_CLUSTER } from '$env/static/public';
import { getDefaultGameState, type GameState } from '$lib/types/game';
import Pusher from 'pusher-js';
import { writable } from 'svelte/store';
import { UPDATE_EVENT, updateChannel } from '../pusherChannels';
import { applyChangeset, type Changeset } from 'json-diff-ts';

export const gameState = writable<GameState>(getDefaultGameState());
export const gameStateStore = {
	subscribe: gameState.subscribe,
    set: gameState.set
};

const pusher = new Pusher(PUBLIC_PUSHER_KEY, { cluster: PUBLIC_PUSHER_CLUSTER });
export function joinGame(gameId: string) {
    pusher.signin();
	const gameChannel = pusher.subscribe(updateChannel(gameId));
	gameChannel.bind(UPDATE_EVENT, (data: Changeset) => {
        gameState.update((obj) => applyChangeset(obj, data));
    });

}

export function leaveGame(id: string) {}

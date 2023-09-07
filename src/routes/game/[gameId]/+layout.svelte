<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { PUBLIC_PUSHER_KEY, PUBLIC_PUSHER_CLUSTER } from '$env/static/public';
	import type { GameState } from '$lib/types/game';
	import { updateChannel, UPDATE_EVENT } from '$lib/util/pusherChannels';
	import { type Changeset, applyChangeset } from 'json-diff-ts';
	import Pusher from 'pusher-js';
	import { writable } from 'svelte/store';

	export const gameState = writable<GameState>(($page.data as LayoutData).gameState);
	const pusher = new Pusher(PUBLIC_PUSHER_KEY, { cluster: PUBLIC_PUSHER_CLUSTER });
	export function joinGame(gameId: string) {
		const gameChannel = pusher.subscribe(updateChannel(gameId));
		gameChannel.bind(UPDATE_EVENT, (data: Changeset) => {
			gameState.update((obj) => applyChangeset(obj, data));
		});
	}

	onMount(() => {
		joinGame($page.params.gameId);
	});
</script>

<div class="w-full h-full grid place-items-center">
	{JSON.stringify($gameState)}
	<slot />
</div>

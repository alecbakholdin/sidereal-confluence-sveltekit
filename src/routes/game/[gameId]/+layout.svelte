<script lang="ts">
	import { page } from '$app/stores';
	import type { GameState } from '$lib/types/game';
	import type { User } from '$lib/types/user';
	import { joinGame } from '$lib/util/client/joinGame';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { LayoutData } from './$types';
	import { setGameContext } from '$lib/util/client/gameContext';
	import { AppShell, Drawer } from '@skeletonlabs/skeleton';
	import GamePlayerList from './game/GamePlayerList.svelte';
	import LobbyPlayerList from './lobby/LobbyPlayerList.svelte';
	import StartButton from './lobby/StartButton.svelte';

	export let data: LayoutData;
	const gameState = writable<GameState>(data.gameState);
	const onlineMembers = writable<User[]>([]);
	setGameContext({ gameState, onlineMembers, me: data.me });

	onMount(() => {
		joinGame(gameState, onlineMembers, $page.params.gameId);
	});
</script>

<AppShell>
	<div class="w-full h-full grid place-items-center">
		<slot />
	</div>
</AppShell>

<Drawer>
	<div class="p-2">
		{#if $gameState.state === 'lobby'}
			<LobbyPlayerList />
			<StartButton />
		{:else if $gameState.state === 'inProgress'}
			<GamePlayerList />
		{/if}
	</div>
</Drawer>

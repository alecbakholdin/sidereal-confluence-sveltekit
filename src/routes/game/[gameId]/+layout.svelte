<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { GameState } from '$lib/types/game';
	import type { User } from '$lib/types/user';
	import { setGameContext } from '$lib/util/client/gameContext';
	import { joinGame } from '$lib/util/client/joinGame';
	import { Drawer, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import type { LayoutData } from './$types';
	import LobbyPlayerList from './lobby/LobbyPlayerList.svelte';
	import StartButton from './lobby/StartButton.svelte';

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	export let data: LayoutData;
	const gameState = writable<GameState>(data.gameState);
	const onlineMembers = writable<User[]>([]);
	setGameContext({ gameState, onlineMembers, me: data.me, getUrl });

	onMount(() =>
		joinGame(
			gameState,
			onlineMembers,
			$page.params.gameId,
			data.me.id,
			toastStore,
			modalStore,
			getUsername
		)
	);

	const derivedState = derived(gameState, ({ state }) => state);
	const lobbyUrl = getUrl('/lobby');
	const gameUrl = getUrl('/game');
	$: if ($derivedState === 'inProgress' && !$page.url.pathname.startsWith(gameUrl)) {
		goto(gameUrl);
	} else if ($derivedState === 'lobby' && !$page.url.pathname.startsWith(lobbyUrl)) {
		goto(lobbyUrl);
	}
	function getUrl(path: string) {
		return `/game/${$gameState.id}/${path.replace(/^\//, '')}`;
	}
	function getUsername(playerId: string) {
		return $gameState.usernameMap[playerId];
	}
</script>

<slot />

<Drawer>
	<div class="p-2">
		{#if $gameState.state === 'lobby'}
			<LobbyPlayerList />
			<StartButton />
		{:else if $gameState.state === 'inProgress'}
			<!-- <GamePlayerList /> -->
		{/if}
	</div>
</Drawer>

<script lang="ts">
	import { page } from '$app/stores';
	import type { GameState } from '$lib/types/game';
	import type { User } from '$lib/types/user';
	import { joinGame } from '$lib/util/client/joinGame';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { LayoutData } from './$types';
	import { setGameContext } from '$lib/util/client/gameContext';

	export let data: LayoutData;
	const gameState = writable<GameState>(data.gameState);
	const onlineMembers = writable<User[]>([]);
	setGameContext({gameState, onlineMembers, me: data.me});

	onMount(() => {
		joinGame(gameState, onlineMembers, $page.params.gameId);
	});
</script>

<div class="w-full h-full grid place-items-center">
	<slot />
</div>

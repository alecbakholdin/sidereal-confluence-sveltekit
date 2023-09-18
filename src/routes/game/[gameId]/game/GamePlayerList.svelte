<script lang="ts">
	import Resource from '$lib/components/Resource.svelte';
	import { raceInfoMap } from '$lib/types/race';
	import { toSortedResourceArr } from '$lib/types/resource';
	import { getGameContext } from '$lib/util/client/gameContext';
	import GamePlayer from './GamePlayer.svelte';

	const gameContext = getGameContext();
	const gameState = gameContext.gameState;
</script>

<h4 class="h4">Players</h4>

<div class="flex flex-col overflow-y-scroll gap-2">
	{#each $gameState.players as playerId (playerId)}
		<GamePlayer {playerId} />
	{/each}
</div>

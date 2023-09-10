<script lang="ts">
	import { page } from '$app/stores';
import Resource from '$lib/components/Resource.svelte';
	import { raceInfoMap } from '$lib/types/race';
	import { toSortedResourceArr } from '$lib/types/resource';
	import { getGameContext } from '$lib/util/client/gameContext';

	const gameContext = getGameContext();
	const gameState = gameContext.gameState;
</script>

<h4 class="h4">Players</h4>

{#each $gameState.players as playerId (playerId)}
	<div class="card variant-soft flex flex-col border" style:border-color={raceInfoMap[$gameState.gameInfo[playerId].race].color}>
		<header class="card-header flex flex-col">
			<h6 class="h6">{$gameState.usernameMap[playerId]}</h6>
            <span class="text-xs text-gray-400">{$gameState.gameInfo[playerId].race}</span>
		</header>
		<section class="px-2 py-4 flex-grow flex">
			{#each toSortedResourceArr($gameState.gameInfo[playerId].resources) as resourceAmount}
				<Resource {...resourceAmount} />
			{/each}
		</section>
	</div>
{/each}

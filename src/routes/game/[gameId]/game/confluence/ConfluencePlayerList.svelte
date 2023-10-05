<script lang="ts">
	import Resource from '$lib/components/Resource.svelte';
	import { getGameState } from '$lib/util/client/gameContext';
	import Icon from '@iconify/svelte';

	const gameState = getGameState();

	$: isColonyTrackActive = $gameState.colonyActiveBidder !== undefined;
	$: isResearchTeamTrackActive = $gameState.researchTeamActiveBidder !== undefined;
	$: biddingOver = isColonyTrackActive || isResearchTeamTrackActive;
	$: readyPlayers = [
		...($gameState?.researchTeamBidOrder || []),
		...($gameState?.colonyBidOrder || [])
	].map((x) => x.user);
</script>

<div class="">
	<ul class="p-4 grid gap-1">
		{#each $gameState.players as player}
			{@const ready = biddingOver || readyPlayers.includes(player)}
			<li class="flex items-center gap-1">
				{#if ready}
					<Icon icon="material-symbols:check" class="text-success-400" />
				{:else}
					<Icon icon="uiw:loading" class="animate-spin text-surface-400" />
				{/if}
				<span class="flex-grow">{$gameState.usernameMap[player]}</span>
				<Resource
					resource="ship"
					iconSize={'text-2xl'}
					quantitySize={'!text-sm'}
					quantity={$gameState.gameInfo[player].resources.find(
						(x) => x.resource === 'ship' && !x.donation
					)?.quantity || 0}
					showZero
				/>
			</li>
		{/each}
	</ul>
</div>

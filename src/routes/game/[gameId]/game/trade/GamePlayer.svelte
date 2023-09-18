<script lang="ts">
	import Resource from '$lib/components/Resource.svelte';
	import { raceInfoMap } from '$lib/types/race';
	import { toSortedResourceArr, type ResourceType, sortByResource } from '$lib/types/resource';
	import { getGameContext } from '$lib/util/client/gameContext';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import TradeProposalModalComponent from '../TradeProposalModalComponent.svelte';
	import EntityContainerComponent from '$lib/components/EntityContainerComponent.svelte';

	export let playerId: string;
	const modalStore = getModalStore();
	const gameContext = getGameContext();
	const gameState = gameContext.gameState;
	const onlineMembers = gameContext.onlineMembers;

	$: isOnline = $onlineMembers.find(({ id }) => id === playerId);
	$: isMe = gameContext.me.id === playerId;
	$: userInfo = $gameState.gameInfo[playerId];
	$: tradePreferences = userInfo.tradePreferences;

	function startTradeProposal() {
		modalStore.trigger({
			type: 'component',
			component: {
				ref: TradeProposalModalComponent,
				props: {
					playerId,
					mePlayerId: gameContext.me.id,
					gameState: $gameState
				}
			}
		});
	}
</script>

<div
	class="card variant-soft flex flex-col border"
	style:border-color={raceInfoMap[$gameState.gameInfo[playerId].race].color}
>
	<header class="card-header flex flex-col">
		<div class="flex items-center justify-between gap-2">
			<h6 class="h6">{$gameState.usernameMap[playerId]}</h6>
			{#if isMe}
				<iconify-icon icon="material-symbols:person" />
			{:else}
				<div
					class="rounded-full w-2 h-2 border"
					class:bg-gray-400={!isOnline}
					class:bg-success-400={isOnline}
				/>
			{/if}
		</div>
		<span class="text-xs text-gray-400">{userInfo.race}</span>
	</header>
	<section class="p-4 flex flex-col gap-3 max-w-sm">
		<div class="flex-grow flex flex-wrap">
			{#each toSortedResourceArr(userInfo.resources) as resourceAmount}
				<Resource {...resourceAmount} />
			{/each}
			{#if userInfo.resources.length === 0}
				<span class="text-gray-400">No resources</span>
			{/if}
		</div>
		<EntityContainerComponent
			entityContainer={tradePreferences?.lookingfor}
			hideIfEmpty
			title="Looking for"
		/>
		<EntityContainerComponent
			entityContainer={tradePreferences?.offering}
			hideIfEmpty
			title="Offering"
		/>
		{#if tradePreferences?.note}
			<div class="bg-surface-700 rounded-md p-2">
				<span>Note</span>
				<p>{tradePreferences.note}</p>
			</div>
		{/if}
	</section>
	{#if !isMe}
		<footer class="card-footer p-4">
			<button type="button" class="btn variant-outline" on:click={startTradeProposal}>Trade</button>
		</footer>
	{/if}
</div>
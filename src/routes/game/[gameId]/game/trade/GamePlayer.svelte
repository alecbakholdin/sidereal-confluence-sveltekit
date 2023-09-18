<script lang="ts">
	import Resource from '$lib/components/Resource.svelte';
	import { raceInfoMap } from '$lib/types/race';
	import { toSortedResourceArr, type ResourceType, sortByResource } from '$lib/types/resource';
	import { getGameContext } from '$lib/util/client/gameContext';

	export let playerId: string;

	const gameContext = getGameContext();
	const gameState = gameContext.gameState;
	const onlineMembers = gameContext.onlineMembers;

	$: isOnline = $onlineMembers.find(({ id }) => id === playerId);
	$: isMe = gameContext.me.id === playerId;
	$: userInfo = $gameState.gameInfo[playerId];
	$: tradePreferences = userInfo.tradePreferences;
	$: lookingFor = sortByResource(
		Object.entries(tradePreferences?.lookingfor.resource || {}) as [ResourceType, number][],
		([r]) => r
	);
	$: offering = sortByResource(
		Object.entries(tradePreferences?.offering.resource || {}) as [ResourceType, number][],
		([r]) => r
	);
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
	<section class="p-4 flex flex-col gap-3">
		<div class="flex-grow flex flex-wrap">
			{#each toSortedResourceArr(userInfo.resources) as resourceAmount}
				<Resource {...resourceAmount} />
			{/each}
			{#if userInfo.resources.length === 0}
				<span class="text-gray-400">No resources</span>
			{/if}
		</div>
		{#if offering.length}
			<div class="resource-container">
				<span>Offering</span>
				<div class="flex gap-1 flex-wrap">
					{#each offering as [resource, quantity]}
						<Resource {resource} {quantity} />
					{/each}
				</div>
			</div>
		{/if}
		{#if lookingFor.length}
			<div class="resource-container">
				<span>Looking for</span>
				<div class="flex gap-1 flex-wrap">
					{#each lookingFor as [resource, quantity]}
						<Resource {resource} {quantity} />
					{/each}
				</div>
			</div>
		{/if}
		{#if tradePreferences?.note}
			<div class="resource-container">
				<span>Note</span>
				<p>{tradePreferences.note}</p>
			</div>
		{/if}
	</section>
</div>

<style lang="postcss">
	.resource-container {
		@apply bg-surface-700 rounded-md p-2;
	}
</style>

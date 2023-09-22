<script lang="ts">
	import type { ColonyType } from '$lib/types/cards/colony';
	import type { EntityContainer } from '$lib/types/entityContainer';
	import { sortedResourceArrFromEntityContainer } from '$lib/types/resource';
	import Icon from '@iconify/svelte';
	import Resource from '../Resource.svelte';
	import ColonyTypeIcon from './ColonyTypeIcon.svelte';
	import { getGameContext } from '$lib/util/client/gameContext';

	const gameContext = getGameContext();

	export let input: EntityContainer | EntityContainer[] | undefined = undefined;
	export let output: EntityContainer | undefined = undefined;
	export let phase: 'trade' | 'economy' = 'economy';
	export let upgrade: boolean = false;
	export let preventWrap: boolean = false;

	$: inputArr = Array.isArray(input) ? input : input ? [input] : [];
	$: inputArrsSorted = inputArr.map(sortedResourceArrFromEntityContainer);
	$: outputArr = sortedResourceArrFromEntityContainer(output);

	function colonyTypes(container: EntityContainer) {
		return (Object.entries(container.colonyTypes || {}) as [ColonyType, number][]).filter(
			([_, qty]) => qty
		);
	}
</script>

<div class="flex items-center p-2">
	<div class="flex items-center gap-1" class:flex-wrap={!preventWrap}>
		{#each inputArr as container, i}
			{#each sortedResourceArrFromEntityContainer(container) as { resource, quantity, donation }}
				<Resource {resource} {quantity} {donation} />
			{/each}
			{#each colonyTypes(container) as [colonyType, qty]}
				<ColonyTypeIcon {colonyType} planetClass={'text-4xl'} />
			{/each}
			{#if i < inputArr.length - 1}
				<span class="text-2xl"><strong>/</strong></span>
			{/if}
		{/each}
		{#if inputArr.length === 0}
			<Icon icon="material-symbols:crop-free" class="text-2xl text-gray-500" />
		{/if}
	</div>
	<div class:text-secondary-400={phase === 'trade'} class:text-white={phase === 'economy'}>
		<Icon icon="uil:arrow-right" class="text-2xl" />
	</div>
	<div class="flex items-center gap-1 flex-wrap w-fit">
		{#each outputArr as { resource, quantity, donation }}
			<Resource {resource} {quantity} {donation} />
		{/each}
		{#if upgrade}
			<Icon icon="grommet-icons:upgrade" class="text-secondary-400 text-2xl" />
		{:else if outputArr.length === 0}
			<Icon icon="material-symbols:crop-free" class="text-2xl" />
		{/if}
	</div>
</div>

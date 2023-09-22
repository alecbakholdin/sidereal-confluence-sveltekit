<script lang="ts">
	import type { ColonyType } from '$lib/types/cards/colony';
	import type { EntityContainer } from '$lib/types/entityContainer';
	import { sortedResourceArrFromEntityContainer } from '$lib/types/resource';
	import Icon from '@iconify/svelte';
	import Resource from '../Resource.svelte';
	import ColonyTypeIcon from './ColonyTypeIcon.svelte';

	export let input: EntityContainer | undefined = undefined;
	export let output: EntityContainer | undefined = undefined;
	export let phase: 'trade' | 'economy' = 'economy';
	export let upgrade: boolean = false;

	$: inputArr = sortedResourceArrFromEntityContainer(input);
	$: outputArr = sortedResourceArrFromEntityContainer(output);
	$: colonyInputs = (Object.entries(input?.colonyTypes || {}) as [ColonyType, number][]).filter(([_, qty]) => qty);
</script>

<div class="flex items-center p-2">
	<div class="flex items-center gap-1 flex-wrap">
		{#each inputArr as { resource, quantity, donation }}
			<Resource {resource} {quantity} {donation} />
		{/each}
		{#each colonyInputs as [colonyType, qty]}
			{#if qty !== undefined}
				<ColonyTypeIcon {colonyType} planetClass={'text-4xl'}/>
			{/if}
		{/each}
		{#if inputArr.length === 0 && colonyInputs.length === 0}
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

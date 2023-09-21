<script lang="ts">
	import type { EntityContainer } from '$lib/types/entityContainer';
	import { sortedResourceArrFromEntityContainer } from '$lib/types/resource';
	import Icon from '@iconify/svelte';
	import Resource from '../Resource.svelte';

	export let input: EntityContainer | undefined = undefined;
	export let output: EntityContainer | undefined = undefined;
	export let phase: 'trade' | 'economy' = 'economy';
	export let upgrade: boolean = false;

	$: inputArr = sortedResourceArrFromEntityContainer(input);
	$: outputArr = sortedResourceArrFromEntityContainer(output);
</script>

<div class="flex items-center p-2">
	<div class="flex items-center gap-1 flex-wrap">
		{#each inputArr as { resource, quantity, donation }}
			<Resource {resource} {quantity} {donation} />
		{/each}
		{#if inputArr.length === 0}
			<Icon icon="material-symbols:crop-free" class="text-2xl" />
		{/if}
	</div>
	<div class:trade={phase === 'trade'} class:economy={phase === 'economy'}>
		<Icon icon="uil:arrow-right" class="text-2xl" />
	</div>
	<div class="flex items-center gap-1 flex-wrap w-fit">
		{#each outputArr as { resource, quantity, donation }}
			<Resource {resource} {quantity} {donation} />
		{/each}
		{#if upgrade}
			<Icon icon="uil:arrow-up" class="text-secondary-400 text-2xl" />
		{:else if outputArr.length === 0}
			<Icon icon="material-symbols:crop-free" class="text-2xl" />
		{/if}
	</div>
</div>

<style>
	.trade svg {
		color: white;
	}
	.economy svg {
		color: var(--donation-color);
	}
	.upgrade {
		color: var(--donation-color);
	}
</style>

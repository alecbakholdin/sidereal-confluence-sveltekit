<script lang="ts">
	import { sortResourceAmounts, type ResourceAmount, type ResourceType } from '$lib/types/resource';
	import type { EntityContainer } from '../types/trade';
	import Resource from './Resource.svelte';

	export let entityContainer: EntityContainer | ResourceAmount[] | undefined;
	export let title: string | undefined = undefined;
	export let hideIfEmpty: boolean = false;
	export let resourceContainerClasses: string = '';

	$: unsortedArr = Array.isArray(entityContainer)
		? entityContainer
		: (Object.entries(entityContainer?.resource || {}) as [ResourceType, number][]).map(
				([r, qty]) => ({ resource: r, quantity: qty }) as ResourceAmount
		  );
	$: resourceArr = sortResourceAmounts(unsortedArr);
</script>

{#if !(hideIfEmpty && !resourceArr.length)}
	<div class="{resourceContainerClasses} info-section">
		{#if title !== undefined}
			<span>{title}</span>
		{/if}
		<div class="flex gap-1 flex-wrap">
			{#each resourceArr as { resource, quantity, donation }}
				<Resource {resource} {quantity} {donation} />
			{/each}
		</div>
	</div>
{/if}
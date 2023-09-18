<script lang="ts">
	import { sortByResource, type ResourceType } from '$lib/types/resource';
	import type { EntityContainer } from '../types/trade';
	import Resource from './Resource.svelte';

	export let entityContainer: EntityContainer | undefined;
	export let title: string | undefined = undefined;
	export let hideIfEmpty: boolean = false;

	$: resourceArr = sortByResource(
		Object.entries(entityContainer?.resource || {}) as [ResourceType, number][],
		([r]) => r
	);
</script>

{#if !(hideIfEmpty && !resourceArr.length)}
	<div class="resource-container">
		{#if title !== undefined}
			<span>{title}</span>
		{/if}
		<div class="flex gap-1 flex-wrap">
			{#each resourceArr as [resource, quantity]}
				<Resource {resource} {quantity} />
			{/each}
		</div>
	</div>
{/if}

<style lang="postcss">
	.resource-container {
		@apply bg-surface-700 rounded-md p-2;
	}
</style>

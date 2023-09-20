<script lang="ts">
	import Resource from '$lib/components/Resource.svelte';
	import { type ResourceType, resources } from '$lib/types/resource';
	import type { EntityContainer } from '$lib/types/trade';

	export let entityContainer: EntityContainer;
	export let ignoreZeros: boolean = false;

	const startingQty = ignoreZeros ? 1 : 0;

	function toggleResource(resource: ResourceType) {
		entityContainer.resource = {
			...entityContainer.resource,
			[resource]: entityContainer.resource[resource] === undefined ? startingQty : undefined
		};
		entityContainer = entityContainer;
	}
	function updateQuantity(resource: ResourceType, quantity: number) {
		entityContainer.resource = { ...entityContainer.resource, [resource]: quantity };
		entityContainer = entityContainer;
	}
</script>

<div class="flex flex-col w-fit gap-1 items-center">
	{#each resources as resource}
		<div
			class="grid grid-cols-3 place-items-center rounded-full p-1 transition-colors"
			class:bg-surface-700={entityContainer.resource[resource] !== undefined}
		>
			<button
				type="button"
				class="btn-icon btn-icon-sm"
				on:click={() =>
					updateQuantity(resource, Math.max(0, (entityContainer.resource[resource] || 0) - 1))}
			>
				<iconify-icon icon="material-symbols:chevron-left" />
			</button>
			<Resource
				{resource}
				quantity={entityContainer.resource[resource]}
				editable
				on:click={() => toggleResource(resource)}
				on:change={({ detail }) =>
					ignoreZeros && !detail ? toggleResource(resource) : updateQuantity(resource, detail)}
			/>
			<button
				type="button"
				class="btn-icon btn-icon-sm"
				on:click={() => updateQuantity(resource, (entityContainer.resource[resource] || 0) + 1)}
			>
				<iconify-icon icon="material-symbols:chevron-right" />
			</button>
		</div>
	{/each}
</div>

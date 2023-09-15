<script lang="ts">
	import { resources, type ResourceAmount, type ResourceType } from '$lib/types/resource';
	import type { TradeEntity } from '$lib/types/trade';
	import type { Writable } from 'svelte/store';
	import TradeEntitySelectorRow from './TradeEntitySelectorRow.svelte';

	export let entities: Writable<TradeEntity[]>;
	$: amountByResource = Object.fromEntries(resourceAmounts.map((r) => [r.resource, r])) as Record<
		ResourceType,
		ResourceAmount
	>;
	$: resourceAmounts = $entities.map((e) => e.resourceAmount).filter((x) => x) as ResourceAmount[];
	function handleToggle(resource: ResourceType) {
		if (amountByResource[resource]) {
			$entities = $entities.filter(({ resourceAmount }) => resourceAmount?.resource !== resource);
		} else {
			$entities = [...$entities, { resourceAmount: { resource, quantity: 0 } }];
		}
	}
	function updateQuantity(resourceType: ResourceType, quantity: number) {
		for (const entity of $entities) {
			if (entity.resourceAmount?.resource === resourceType) {
				entity.resourceAmount.quantity = quantity;
				$entities = $entities;
				break;
			}
		}
	}
</script>

{JSON.stringify($entities)}
<div class="flex flex-col w-fit gap-1 items-center">
	{#each resources as resource, i}
		<TradeEntitySelectorRow
			{resource}
			quantity={amountByResource[resource]?.quantity}
			active={!!amountByResource[resource]}
			on:change={({ detail }) => updateQuantity(resource, detail)}
			on:toggle={() => handleToggle(resource)}
		/>
	{/each}
</div>

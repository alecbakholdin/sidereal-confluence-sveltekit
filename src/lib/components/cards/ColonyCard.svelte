<script lang="ts">
	import type { Colony } from '$lib/types/cards/colony';
	import ColonyType from './ColonyType.svelte';
	import Converter from './Converter.svelte';
	import ExpandableCardTemplate from './ExpandableCardTemplate.svelte';

	const colonyCard: Colony = {
		id: `testing-${crypto.randomUUID()}`,
		title: 'Colony Title',
		frontType: 'white',
		backType: 'green',
		frontConverters: [{ output: { resource: { brown: 1 } } }],
		backConverters: [{ input: { resource: { brown: 1 } }, output: { resource: { hexagon: 1 } } }],
		upgradeConverters: [{ input: { resource: { hexagon: 1 } } }]
	};
</script>

<ExpandableCardTemplate>
	<span class="text-center" slot="title">{colonyCard.title}</span>
	<div class="grid place-items-center h-full" slot="frontTop">
		<ColonyType colonyType={colonyCard.frontType} />
	</div>
	<div slot="frontCenter" class="grid grid-cols-[auto_1fr] place-items-center">
		{#each colonyCard.frontConverters || [] as { input, output }, i}
			{@const inputId = `${colonyCard.id}-front-${i}`}
			<label class="flex gap-2 items-center cursor-pointer" for={inputId}>
				<input type="checkbox" class="checkbox" name="scheduled" id={inputId} />
				<Converter {input} {output} />
			</label>
		{/each}
	</div>
	<div
		slot="frontBottom"
		class="h-full flex items-end"
        class:justify-between={colonyCard.upgradeConverters?.length !== 1}
		class:justify-center={colonyCard.upgradeConverters?.length === 1}
	>
		{#each colonyCard.upgradeConverters || [] as { input, output }}
			<div>
				<button type="button" class="btn variant-ringed-secondary p-0">
					<Converter {input} {output} upgrade phase="trade" />
				</button>
			</div>
		{/each}
	</div>
	<div class="grid place-items-center h-full" slot="backTop">
		<ColonyType colonyType={colonyCard.backType} />
	</div>
	<div slot="backCenter" class="grid grid-cols-[auto_1fr] place-items-center">
		{#each colonyCard.backConverters || [] as { input, output }}
			<input type="checkbox" class="checkbox" />
			<Converter {input} {output} />
		{/each}
	</div>
</ExpandableCardTemplate>

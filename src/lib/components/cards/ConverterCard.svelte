<script lang="ts">
	import type { ConverterCard } from '$lib/types/cards/converterCard';
	import Converter from './Converter.svelte';
	import ExpandableCardTemplate from './ExpandableCardTemplate.svelte';

	const converterCard: ConverterCard = {
		id: `testingConverter-${crypto.randomUUID()}`,
		age: 1,
		title: 'Megastructures',
		technology: 'Megastructures',
		frontConverters: [
			{
				input: { resource: { black: 2, green: 4 } },
				output: { resource: { hexagon: 1, black: 2, blue: 4 }, donation: { hexagon: 1 } }
			}
		],
		upgradeOptions: [
			{
				converter: {
					input: {
						colonyTypes: {
							blue: 1
						}
					}
				}
			},
			{
				technology: 'Social Exodus'
			}
		]
	};
</script>

<ExpandableCardTemplate orientation="horizontal">
	<span class="text-center" slot="title">
		{converterCard.title}
	</span>
	<div slot="frontCenter">
		{#each converterCard.frontConverters || [] as { input, output }, i}
			{@const converterId = `${converterCard.id}-front-${i}`}
			<label class="label flex gap-2 items-center cursor-pointer" for={converterId}>
				<input type="checkbox" class="checkbox" name="enabled" id={converterId} />
				<Converter {input} {output} />
			</label>
		{/each}
	</div>
	<div slot="backCenter">
		{#each converterCard.backConverters || [] as { input, output }, i}
			{@const converterId = `${converterCard.id}-back-${i}`}
			<label class="label flex gap-2" for={converterId}>
				<Converter {input} {output} />
			</label>
		{/each}
	</div>
	<div class="flex justify-between items-end h-full w-full" slot="frontBottom">
		{#each converterCard.upgradeOptions || [] as { technology, converter }}
			{#if technology}
				<div class="p-2 w-24 text-center border border-secondary-400 rounded-md">{technology}</div>
			{:else if converter}
				{@const { input, output } = converter}
				<div class="border border-secondary-400 rounded-md">
					<Converter {input} {output} upgrade phase="trade" />
				</div>
			{/if}
		{/each}
	</div>
</ExpandableCardTemplate>

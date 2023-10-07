<script lang="ts">
	import type { PlayerCard } from '$lib/types/cards/card';
	import { converterCardMap } from '$lib/types/cards/converterCard';
	import type { CardProps, CardSlots } from './Card.svelte';
	import Converter from './cardParts/Converter.svelte';
	import ExpandableCardTemplate from './cardParts/ExpandableCardTemplate.svelte';

	interface $$Props extends CardProps {}
	interface $$Slots extends CardSlots {}

	export let cardInfo: PlayerCard | string;
	export let displayOnly = false;

	$: isUpgraded = (typeof cardInfo !== 'string' && cardInfo.upgraded) || false;
	$: reservations = (typeof cardInfo !== 'string' && cardInfo.reservedConverters) || [];
	$: frontSelectable = !displayOnly && !isUpgraded;
	$: backSelectable = !displayOnly && isUpgraded;
	let flipped: boolean = isUpgraded;
	$: flipped = isUpgraded;
	$: cardId = typeof cardInfo === 'string' ? cardInfo : cardInfo.cardId;
	$: converterCard = converterCardMap[cardId];
</script>

<ExpandableCardTemplate
	orientation="horizontal"
	{flipped}
	disableExpansion={displayOnly}
	expanded={displayOnly}
>
	<span class="text-center" slot="frontTitle">
		{converterCard.frontTitle}
	</span>
	<span class="text-center" slot="backTitle">
		{converterCard.backTitle}
	</span>
	<div slot="frontCenter">
		{#each converterCard.frontConverters || [] as { input, output }, i}
			{@const formId = `${converterCard.id}-mark-front-${i}`}
			<slot name="markForEconomyForm" {formId} {i} status={reservations[i]} />
			<Converter
				{input}
				{output}
				bind:reserved={reservations[i]}
				form={formId}
				reservable={frontSelectable}
			/>
		{/each}
	</div>
	<div slot="backCenter">
		{#each converterCard.backConverters || [] as { input, output }, i}
			{@const formId = `${converterCard.id}-mark-back-${i}`}
			<slot name="markForEconomyForm" {formId} {i} status={reservations[i]} />
			<Converter
				{input}
				{output}
				bind:reserved={reservations[i]}
				form={formId}
				reservable={backSelectable}
			/>
		{/each}
	</div>
	<div class="flex justify-between items-end h-full w-full" slot="frontBottom">
		{#each converterCard.upgradeOptions || [] as { technology, converter }}
			{#if technology}
				<div class="p-2 w-24 text-center border border-secondary-400 rounded-sm">{technology}</div>
			{:else if converter}
				{@const { input, output } = converter}
				<div class="border border-secondary-400 rounded-sm">
					<Converter {input} {output} upgrade phase="trade" />
				</div>
			{/if}
		{/each}
	</div>
</ExpandableCardTemplate>

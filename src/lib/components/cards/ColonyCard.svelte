<script lang="ts">
	import type { PlayerCard } from '$lib/types/cards/card';
	import { colonyMap } from '$lib/types/cards/colony';
	import { createEventDispatcher } from 'svelte';
	import type { CardProps, CardSlots } from './Card.svelte';
	import ColonyType from './cardParts/ColonyTypeIcon.svelte';
	import Converter from './cardParts/Converter.svelte';
	import ExpandableCardTemplate from './cardParts/ExpandableCardTemplate.svelte';

	interface $$Slots extends CardSlots {}
	interface $$Props extends CardProps {}

	export let cardInfo: PlayerCard | string;
	export let displayOnly: boolean = false;

	const dispatch = createEventDispatcher<{
		markForEconomy: {
			status: boolean;
			converterNumber: number;
		};
		upgrade: number;
	}>();

	$: isUpgraded = (typeof cardInfo !== 'string' && cardInfo.upgraded) || false;
	$: reservations = (typeof cardInfo !== 'string' && cardInfo.reservedConverters) || [];
	$: colonyCard = typeof cardInfo === 'string' ? colonyMap[cardInfo] : cardInfo.colony!;
	$: frontSelectable = !displayOnly && !isUpgraded;
	$: backSelectable = !displayOnly && isUpgraded;
	let flipped: boolean = isUpgraded;
	$: flipped = isUpgraded;
</script>

<ExpandableCardTemplate
	bind:flipped
	on:toggleExpanded={({ detail }) => !detail && (flipped = isUpgraded)}
>
	<span class="text-center" slot="title">{colonyCard.title}</span>
	<div class="grid place-items-center h-full" slot="frontTop">
		<ColonyType colonyType={colonyCard.frontType} />
	</div>
	<div slot="frontCenter" class="grid grid-cols-[auto_1fr] place-items-center">
		{#each colonyCard.frontConverters || [] as { input, output }, i}
			{@const formId = `${colonyCard.id}-mark-front-${i}`}
			<slot name="markForEconomyForm" {formId} {i} status={reservations[i]} />
			<Converter
				{input}
				{output}
				bind:reserved={reservations[i]}
				form={formId}
				on:toggle={() =>
					dispatch('markForEconomy', { converterNumber: i, status: !reservations[i] })}
				reservable={frontSelectable}
			/>
		{/each}
	</div>
	<div
		slot="frontBottom"
		class="h-full flex items-end"
		class:justify-between={colonyCard.upgradeConverters?.length !== 1}
		class:justify-center={colonyCard.upgradeConverters?.length === 1}
	>
		{#each colonyCard.upgradeConverters || [] as { input, output }, i}
			{@const formId = `${colonyCard.id}-upgrade-${i}`}
			<slot name="upgradeForm" {formId} {i} />
			<button
				type="submit"
				form={formId}
				class="btn p-0 cursor-pointer"
				disabled={isUpgraded}
			>
				<Converter {input} {output} upgrade phase="trade" />
			</button>
		{/each}
	</div>
	<div class="grid place-items-center h-full" slot="backTop">
		<ColonyType colonyType={colonyCard.backType} />
	</div>
	<div slot="backCenter">
		{#each colonyCard.backConverters || [] as { input, output }, i}
			{@const formId = `${colonyCard.id}-mark-back-${i}`}
			<slot name="markForEconomyForm" {formId} {i} status={reservations[i]} />
			<Converter
				{input}
				{output}
				bind:reserved={reservations[i]}
				on:toggle={() =>
					dispatch('markForEconomy', { converterNumber: i, status: !reservations[i] })}
				form={formId}
				reservable={backSelectable}
			/>
		{/each}
	</div>
</ExpandableCardTemplate>

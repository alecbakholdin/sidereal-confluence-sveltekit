<script lang="ts">
	import type { PlayerCard } from '$lib/types/cards/card';
	import { colonyMap } from '$lib/types/cards/colony';
	import ColonyType from './ColonyTypeIcon.svelte';
	import Converter from './Converter.svelte';
	import ExpandableCardTemplate from './ExpandableCardTemplate.svelte';

	export let playerCard: PlayerCard;

	const colonyCard = colonyMap[playerCard.cardId];
	let flipped: boolean = playerCard.upgraded;
</script>

<ExpandableCardTemplate
	bind:flipped
	on:toggleExpanded={({ detail }) => !detail && (flipped = playerCard.upgraded)}
>
	<span class="text-center" slot="title">{colonyCard.title}</span>
	<div class="grid place-items-center h-full" slot="frontTop">
		<ColonyType colonyType={colonyCard.frontType} />
	</div>
	<div slot="frontCenter" class="grid grid-cols-[auto_1fr] place-items-center">
		{#each colonyCard.frontConverters || [] as { input, output }, i}
			{@const inputId = `${colonyCard.id}-front-${i}`}
			<label
				class="flex gap-2 items-center cursor-pointer"
				for={inputId}
				class:cursor-pointer={!playerCard.upgraded}
			>
				{#if !playerCard.upgraded}
					<input type="checkbox" class="checkbox" name="scheduled" id={inputId} />
				{/if}
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
	<div slot="backCenter">
		{#each colonyCard.backConverters || [] as { input, output }, i}
			{@const inputId = `${colonyCard.id}-back-${i}`}

			<label
				for={inputId}
				class="label flex gap-2 items-center"
				class:cursor-pointer={playerCard.upgraded}
			>
				{#if playerCard.upgraded}
					<input type="checkbox" class="checkbox" id={inputId} />
				{/if}
				<Converter {input} {output} />
			</label>
		{/each}
	</div>
</ExpandableCardTemplate>

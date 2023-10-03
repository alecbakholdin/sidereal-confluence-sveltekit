<script context="module" lang="ts">
	export interface CardSlots {
		markForEconomyForm: {
			formId: string;
			i: number;
			status: boolean;
		};
		upgradeForm: {
			formId: string;
			i: number;
		};
	}
	export interface CardProps {
		displayOnly?: boolean;
		cardInfo: PlayerCard;
	}
</script>

<script lang="ts">
	import type { PlayerCard } from '$lib/types/cards/card';
	import ColonyCard from './ColonyCard.svelte';
	import ConverterCard from './ConverterCard.svelte';
	import ResearchTeamCard from './ResearchTeamCard.svelte';

	interface $$Slots extends CardSlots {}
	interface $$Props extends CardProps {}

	export let displayOnly: boolean = false;
	export let cardInfo: PlayerCard;
</script>

{#if cardInfo.cardType === 'Colony'}
	<ColonyCard {cardInfo} {displayOnly}>
		<svelte:fragment slot="markForEconomyForm" let:formId let:status let:i>
			<slot name="markForEconomyForm" {formId} {status} {i} />
		</svelte:fragment>
		<svelte:fragment slot="upgradeForm" let:formId let:i>
			<slot name="upgradeForm" {formId} {i} />
		</svelte:fragment>
	</ColonyCard>
{:else if cardInfo.cardType === 'Converter'}
	<ConverterCard {cardInfo} />
{:else if cardInfo.cardType === 'Research Team'}
	<ResearchTeamCard {cardInfo} />
{:else}
	Unsupported card type {cardInfo.cardType}
{/if}

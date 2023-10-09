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
		cardInfo: PlayerCard | string;
	}
</script>

<script lang="ts">
	import type { CardType, PlayerCard } from '$lib/types/cards/card';
	import { colonyMap } from '$lib/types/cards/colony';
	import { converterCardMap } from '$lib/types/cards/converterCard';
	import { researchTeamMap } from '$lib/types/cards/researchTeam';
	import ColonyCard from './ColonyCard.svelte';
	import ConverterCard from './ConverterCard.svelte';
	import ResearchTeamCard from './ResearchTeamCard.svelte';

	interface $$Slots extends CardSlots {}
	interface $$Props extends CardProps {}

	export let displayOnly: boolean = false;
	export let cardInfo: PlayerCard | string;

	function isOfType(obj: Record<string, any>, type: CardType): CardType | undefined {
		return (typeof cardInfo === 'string' && obj[cardInfo] && type) || undefined;
	}

	$: cardtypeIfString =
		isOfType(colonyMap, 'Colony') ||
		isOfType(researchTeamMap, 'Research Team') ||
		isOfType(converterCardMap, 'Converter');
	$: cardType = typeof cardInfo === 'string' ? cardtypeIfString : cardInfo.cardType;
</script>

{#if cardType === 'Colony'}
	<ColonyCard {cardInfo} {displayOnly}>
		<svelte:fragment slot="markForEconomyForm" let:formId let:status let:i>
			<slot name="markForEconomyForm" {formId} {status} {i} />
		</svelte:fragment>
		<svelte:fragment slot="upgradeForm" let:formId let:i>
			<slot name="upgradeForm" {formId} {i} />
		</svelte:fragment>
	</ColonyCard>
{:else if cardType === 'Converter'}
	<ConverterCard {cardInfo}>
		<svelte:fragment slot="markForEconomyForm" let:formId let:status let:i>
			<slot name="markForEconomyForm" {formId} {status} {i} />
		</svelte:fragment>
		<svelte:fragment slot="upgradeForm" let:formId let:i>
			<slot name="upgradeForm" {formId} {i} />
		</svelte:fragment>
	</ConverterCard>
{:else if cardType === 'Research Team'}
	<ResearchTeamCard {cardInfo} {displayOnly} />
{:else}
	Unsupported card type {cardType}
{/if}

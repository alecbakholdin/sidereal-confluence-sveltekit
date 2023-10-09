<script lang="ts">
	import type { PlayerCard } from '$lib/types/cards/card';
	import { researchTeamMap, type ResearchTeam } from '$lib/types/cards/researchTeam';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import type { CardProps } from './Card.svelte';
	import Converter from './cardParts/Converter.svelte';
	import Era from './cardParts/Era.svelte';
	import ExpandableCardTemplate from './cardParts/ExpandableCardTemplate.svelte';
	import { getMyPlayerInfo } from '$lib/util/client/gameContext';
	import { converterCards } from '$lib/types/cards/converterCard';
	import ConverterCard from './ConverterCard.svelte';
	import { fade } from 'svelte/transition';

	interface $$Props extends CardProps {}

	export let cardInfo: string | PlayerCard;
	export let displayOnly: boolean = false;

	const myPlayerInfo = getMyPlayerInfo();

	$: cardId = typeof cardInfo === 'string' ? cardInfo : cardInfo.cardId;
	$: researchTeam = researchTeamMap[cardId];
	$: technology = researchTeam?.result.technology || undefined;
	$: converterCard =
		technology &&
		converterCards.find((x) => x.race === $myPlayerInfo.race && x.technology === technology)?.id;

	const {
		elements: { trigger, content },
		states: { open }
	} = createTooltip({
		openDelay: 0,
		positioning: {
			placement: 'bottom',
			fitViewport: false,
			flip: true
		}
	});
</script>

<ExpandableCardTemplate
	orientation="horizontal"
	disableFlip
	disableExpansion={displayOnly}
	expanded={displayOnly}
>
	<span slot="title">{researchTeam.title}</span>
	<div slot="frontCenter">
		{#each researchTeam.researchConverters || [] as { input, output }}
			<Converter {input} {output} preventWrap phase="trade" />
		{/each}
	</div>
	<div slot="frontBottom" class="flex flex-col items-center justify-end h-full relative">
		{#if researchTeam.era}
			<div class="absolute bottom-0 left-0">
				<Era era={researchTeam.era} />
			</div>
		{/if}
		{#if researchTeam.result?.technology}
			<p class="text-sm">Researches</p>
			<button
				type="button"
				class="text-lg text-tertiary-400"
				use:melt={$trigger}
				on:click={() => ($open = true)}
			>
				{researchTeam.result.technology}
			</button>
		{/if}
	</div>
</ExpandableCardTemplate>

{#if $open && converterCard}
	<div class="!bg-primary-700 card z-30 transform scale-90 p-1" use:melt={$content} transition:fade={{duration: 100}}>
		<ConverterCard cardInfo={converterCard} displayOnly />
	</div>
{/if}

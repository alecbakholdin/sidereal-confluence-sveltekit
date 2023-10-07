<script lang="ts">
	import type { PlayerCard } from '$lib/types/cards/card';
	import { researchTeamMap, type ResearchTeam } from '$lib/types/cards/researchTeam';
	import type { CardProps } from './Card.svelte';
	import Converter from './cardParts/Converter.svelte';
	import Era from './cardParts/Era.svelte';
	import ExpandableCardTemplate from './cardParts/ExpandableCardTemplate.svelte';

	interface $$Props extends CardProps {}

	export let cardInfo: string | PlayerCard;
	export let displayOnly: boolean = false;

	$: cardId = typeof cardInfo === 'string' ? cardInfo : cardInfo.cardId;
	$: researchTeam = researchTeamMap[cardId];
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
			<p class="text-lg text-tertiary-400">{researchTeam.result.technology}</p>
		{/if}
	</div>
</ExpandableCardTemplate>

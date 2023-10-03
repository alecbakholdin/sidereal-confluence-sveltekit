<script lang="ts">
	import type { ResearchTeam } from '$lib/types/cards/researchTeam';
	import type { CardProps } from './Card.svelte';
	import Converter from './cardParts/Converter.svelte';
	import ExpandableCardTemplate from './cardParts/ExpandableCardTemplate.svelte';

	interface $$Props extends CardProps {};

	const researchTeam: ResearchTeam = {
		id: `testing-${crypto.randomUUID()}`,
		title: 'Random research title',
		result: {
			technology: 'Megastructures'
		},
		researchConverters: [
			{
				input: [
					{
						resource: {
							black: 12
						}
					},
					{
						resource: {
							brown: 30
						}
					}
				],
                output: {
                    sharingBonus: true,
                    resource: {
                        point: 1
                    }
                }
			}
		]
	};
</script>

<ExpandableCardTemplate orientation="horizontal" disableFlip>
	<span slot="title">{researchTeam.title}</span>
    <div slot="frontCenter">
        {#each researchTeam.researchConverters || [] as {input, output}}
            <Converter {input} {output} preventWrap phase="trade"/>
        {/each}
    </div>
	<div slot="frontBottom" class="flex flex-col items-center justify-end h-full">
		{#if researchTeam.result?.technology}
			<p class="text-sm">Researches</p>
			<p class="text-lg text-tertiary-400">{researchTeam.result.technology}</p>
		{/if}
	</div>
</ExpandableCardTemplate>

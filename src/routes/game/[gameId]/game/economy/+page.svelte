<script lang="ts">
	import ColonyCard from '$lib/components/cards/ColonyCard.svelte';
	import ConverterCard from '$lib/components/cards/ConverterCard.svelte';
	import ResearchTeamCard from '$lib/components/cards/ResearchTeamCard.svelte';
	import { getGameContext } from '$lib/util/client/gameContext';
	import Icon from '@iconify/svelte';
	import { createAccordion, melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';

	const gameContext = getGameContext();
	const gameState = gameContext.gameState;
	$: mePlayerInfo = $gameState.gameInfo[gameContext.me.id];

	const {
		elements: { item, root, trigger, content },
		helpers: { isSelected }
	} = createAccordion({ defaultValue: 'colonies' });

	const test = [
		{
			id: 'converter-cards',
			title: 'Converter Cards',
			icon: 'fluent:card-ui-20-regular',
			numberConverters: 8
		},
		{
			id: 'colonies',
			title: 'Colonies',
			icon: 'mdi:planet',
			numberConverters: 3
		},
		{
			id: 'research-teams',
			title: 'Research Teams',
			icon: 'majesticons:test-tube-filled',
			numberConveters: 2
		}
	] as { id: string; title: string; icon: string; numberConverters: number }[];
</script>

<div class="p-2 md:p-4 w-full max-w-4xl place-self-center" use:melt={$root}>
	{#each test as { id, title, icon, numberConverters }}
		{@const selected = $isSelected(id)}
		<div class="card my-1" use:melt={$item(id)} class:hover:bg-surface-700={!selected}>
			<button type="button" class="w-full flex items-center p-2 gap-2" use:melt={$trigger(id)}>
				<Icon {icon} class="text-4xl" />
				<h4 class="h4 flex-grow sm:text-start">{title}</h4>
				<div class:rotate-180={selected}>
					<Icon icon="tabler:chevron-down" class="text-4xl" />
				</div>
			</button>
			{#if selected}
				<ul
					class="grid place-items-center grid-cols-1 lg:grid-cols-2 pb-4 gap-2"
					use:melt={$content(id)}
					transition:slide
				>
					{#if id === 'colonies'}
						{#each mePlayerInfo.colonies as playerCard}
							<ColonyCard {playerCard} />
						{/each}
					{:else}
						{#each Array(numberConverters).fill(0, 0) as _}
							<li>
								{#if id === 'converter-cards'}
									<ConverterCard />
								{:else}
									<ResearchTeamCard />
								{/if}
							</li>
						{/each}
					{/if}
				</ul>
			{/if}
		</div>
	{/each}
</div>

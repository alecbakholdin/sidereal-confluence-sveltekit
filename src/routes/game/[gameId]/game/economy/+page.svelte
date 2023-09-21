<script lang="ts">
	import ColonyCard from '$lib/components/cards/ColonyCard.svelte';
	import ConverterCard from '$lib/components/cards/ConverterCard.svelte';
	import Icon from '@iconify/svelte';
	import { createAccordion, melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';

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

<div class="p-2 md:p-4 w-full max-w-2xl place-self-center" use:melt={$root}>
	{#each test as { id, title, icon, numberConverters }}
		{@const selected = $isSelected(id)}
		<div class="card my-1" use:melt={$item(id)} class:hover:bg-surface-700={!selected}>
			<button type="button" class="w-full flex items-center p-2 gap-2" use:melt={$trigger(id)}>
				<Icon {icon} class="text-4xl" />
				<h4 class="h4 flex-grow sm:text-start">{title}</h4>
				<div class:rotate-180={selected}>
					<Icon icon="tabler:chevron-down" class="text-4xl transition-transform" />
				</div>
			</button>
			{#if selected}
				<ul class="flex flex-wrap gap-2 p-2" use:melt={$content(id)} transition:slide>
					{#each Array(numberConverters).fill(0, 0) as _}
						<li>
							{#if id === 'colonies'}<ColonyCard />{:else}<ConverterCard />{/if}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/each}
</div>

<script lang="ts">
	import { page } from '$app/stores';
	import Card from '$lib/components/cards/Card.svelte';
	import type { PlayerCard } from '$lib/types/cards/card.js';
	import { getGameState, getMyPlayerInfo } from '$lib/util/client/gameContext';
	import { confirmAction } from '$lib/util/client/modals';
	import { superFormToastOnError } from '$lib/util/client/toasts';
	import Icon from '@iconify/svelte';
	import { createAccordion, melt } from '@melt-ui/svelte';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { slide } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';
	import EconomyOutcomePreview from './EconomyOutcomePreview.svelte';

	export let data;

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	const {
		elements: { item, root, trigger, content },
		helpers: { isSelected }
	} = createAccordion({ defaultValue: 'colonies' });

	const { enhance: markForEconomyEnhance } = superForm(data.markForEconomyForm, {
		onError: (e) => superFormToastOnError(toastStore, e)
	});
	const { enhance: upgradeEnhance } = superForm(data.upgradeForm, {
		onSubmit: async ({ cancel }) =>
			await confirmAction(modalStore, {
				onCancel: cancel,
				prompt: 'Are you sure you want to upgrade?'
			}),
		onError: (e) => superFormToastOnError(toastStore, e)
	});
	const myPlayerInfo = getMyPlayerInfo();
	const gameState = getGameState();

	const cardList: { id: string; title: string; icon: string; cards: PlayerCard[] }[] = [
		{
			id: 'converter-cards',
			title: 'Converter Cards',
			icon: 'fluent:card-ui-20-regular',
			cards: $myPlayerInfo.converterCards
		},
		{
			id: 'colonies',
			title: 'Colonies',
			icon: 'mdi:planet',
			cards: $myPlayerInfo.colonies
		},
		{
			id: 'research-teams',
			title: 'Research Teams',
			icon: 'majesticons:test-tube-filled',
			cards: $myPlayerInfo.researchTeams
		}
	];
</script>

<div class="p-2 md:p-4 w-full max-w-4xl place-self-center" use:melt={$root}>
	<div class="grid place-items-center">
		<EconomyOutcomePreview />
	</div>
	{#each cardList as { id, title, icon, cards }}
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
					{#each cards as card}
						<li>
							<Card cardInfo={card}>
								<svelte:fragment slot="upgradeForm" let:formId let:i>
									<form
										id={formId}
										action="{$page.url.pathname}?/upgrade"
										use:upgradeEnhance
										method="post"
									>
										<input type="hidden" name="optionNumber" value={i} />
										<input type="hidden" name="cardId" value={card.cardId} />
									</form>
								</svelte:fragment>
								<svelte:fragment slot="markForEconomyForm" let:formId let:i let:status>
									<form
										id={formId}
										action="{$page.url.pathname}?/markForEconomy"
										use:markForEconomyEnhance
										method="post"
									>
										<input type="hidden" name="converterNumber" value={i} />
										<input type="hidden" name="cardId" value={card.cardId} />
										<input type="hidden" name="status" value={status} />
									</form>
								</svelte:fragment>
							</Card>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/each}
</div>

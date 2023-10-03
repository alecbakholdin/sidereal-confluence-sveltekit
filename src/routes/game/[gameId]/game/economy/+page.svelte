<script>
	import { page } from '$app/stores';
	import ColonyCard from '$lib/components/cards/ColonyCard.svelte';
	import { getMyPlayerInfo } from '$lib/util/client/gameContext';
	import { confirmAction } from '$lib/util/client/modals';
	import { superFormToastOnError } from '$lib/util/client/toasts';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const toastStore = getToastStore();
	const modalStore = getModalStore();

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
</script>

{#each $myPlayerInfo.colonies as colony}
	<ColonyCard cardInfo={colony}>
		<svelte:fragment slot="upgradeForm" let:formId let:i>
			<form id={formId} action="{$page.url.pathname}?/upgrade" use:upgradeEnhance method="post">
				<input type="hidden" name="optionNumber" value={i} />
				<input type="hidden" name="cardId" value={colony.cardId} />
			</form>
		</svelte:fragment>
		<svelte:fragment slot="markForEconomyForm" let:formId let:i let:status>
			<form
				id={formId}
				action="{$page.url.pathname}?/markForEconomy"
				use:markForEconomyEnhance
				method="post"
			>
				<input type="hidden" name="optionNumber" value={i} />
				<input type="hidden" name="cardId" value={colony.cardId} />
				<input type="hidden" name="status" value={status} />
			</form>
		</svelte:fragment>
	</ColonyCard>
{/each}

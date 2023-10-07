<script lang="ts">
	import { page } from '$app/stores';
	import { loadingButton } from '$lib/actions/loadingButton.js';
	import Resource from '$lib/components/Resource.svelte';
	import { getMyPlayerInfo } from '$lib/util/client/gameContext';
	import { superFormToastOnError } from '$lib/util/client/toasts.js';
	import Icon from '@iconify/svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { slide } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import ConfluencePlayerList from './ConfluencePlayerList.svelte';

	const toastStore = getToastStore();

	const myPlayerInfo = getMyPlayerInfo();

	const data = $page.data as PageData;
	const { form, enhance, submitting } = superForm(data.bidForm, {
		onError: (e) => superFormToastOnError(toastStore, e),
		dataType: 'json'
	});
	$: myShipTotal =
		$myPlayerInfo.resources.find((x) => x.resource === 'ship' && !x.donation)?.quantity || 0;
	$: myShipsRemaining = myShipTotal - $form.researchTeamShips - $form.colonyShips;
</script>

<form
	action="{$page.url.pathname}?/setBid"
	class="card w-fit place-self-center"
	method="post"
	transition:slide
	use:enhance
>
	<header class="card-header">
		<h4 class="h4">Bid Allocations</h4>
	</header>
	<div class="flex flex-col sm:flex-row">
		<ConfluencePlayerList />
		<div class="divider-vertical mb-4 mt-2 hidden sm:block" />
		<div class="grid place-items-center grid-cols-2 gap-4 p-4">
			<div class="grid place-items-center col-span-2">
				<span>Remaining</span>
				<Resource resource="ship" quantity={myShipsRemaining} />
			</div>
			<div class="grid place-items-center">
				<span>Colonies</span>
				<div class="flex items-center">
					<button
						type="button"
						class="btn-icon btn-icon-sm variant-soft-surface"
						on:click={() => ($form.colonyShips = Math.max(0, $form.colonyShips - 1))}
					>
						<Icon icon="material-symbols:chevron-left" />
					</button>
					<Resource
						resource="ship"
						quantity={$form.colonyShips}
						editable
						on:change={({ detail }) =>
							($form.colonyShips = Math.max(
								0,
								Math.min(myShipTotal - $form.researchTeamShips, detail)
							))}
					/>
					<button
						type="button"
						class="btn-icon btn-icon-sm variant-soft-surface"
						on:click={() => {
							if(myShipsRemaining || $form.researchTeamShips) $form.colonyShips++;
                            if(!myShipsRemaining) $form.researchTeamShips--;
						}}
					>
						<Icon icon="material-symbols:chevron-right" />
					</button>
				</div>
			</div>
			<div class="grid place-items-center">
				<span>Research Teams</span>
				<div class="flex items-center">
					<button
						type="button"
						class="btn-icon btn-icon-sm variant-soft-surface"
						on:click={() => ($form.researchTeamShips = Math.max(0, $form.researchTeamShips - 1))}
					>
						<Icon icon="material-symbols:chevron-left" />
					</button>
					<Resource
						resource="ship"
						quantity={$form.researchTeamShips}
						editable
						on:change={({ detail }) =>
							($form.researchTeamShips = Math.max(
								0,
								Math.min(myShipTotal - $form.colonyShips, detail)
							))}
					/>
					<button
						type="button"
						class="btn-icon btn-icon-sm variant-soft-surface"
						on:click={() => {
							if (myShipsRemaining || $form.colonyShips) $form.researchTeamShips++;
							if (!myShipsRemaining) $form.colonyShips--;
						}}
					>
						<Icon icon="material-symbols:chevron-right" />
					</button>
				</div>
			</div>
			<button
				class="btn variant-ghost-secondary w-full col-span-2"
				use:loadingButton={{ loading: submitting }}
			>
				Submit
			</button>
		</div>
	</div>
</form>

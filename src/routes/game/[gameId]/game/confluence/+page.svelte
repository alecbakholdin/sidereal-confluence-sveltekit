<script lang="ts">
	import { page } from '$app/stores';
	import { loadingButton } from '$lib/actions/loadingButton.js';
	import Resource from '$lib/components/Resource.svelte';
	import Card from '$lib/components/cards/Card.svelte';
	import { getGameState, getMe, getMyPlayerInfo } from '$lib/util/client/gameContext';
	import { confirmAction } from '$lib/util/client/modals.js';
	import { superFormToastOnError } from '$lib/util/client/toasts.js';
	import Icon from '@iconify/svelte';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { flip } from 'svelte/animate';
	import { writable } from 'svelte/store';
	import { fade, slide } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data;
	const toastStore = getToastStore();
	const modalStore = getModalStore();

	const gameState = getGameState();
	const myPlayerInfo = getMyPlayerInfo();
	const me = getMe();

	const { enhance: selectConfluenceEnhance } = superForm(data.selectConfluenceCardForm, {
		onError: (e) => superFormToastOnError(toastStore, e),
		onSubmit: ({ cancel }) => confirmAction(modalStore, { onCancel: cancel })
	});

	const { form, enhance, submitting } = superForm(data.bidForm, {
		onError: (e) => superFormToastOnError(toastStore, e),
		dataType: 'json'
	});
	$: myShipTotal =
		$myPlayerInfo.resources.find((x) => x.resource === 'ship' && !x.donation)?.quantity || 0;
	$: myShipsRemaining = myShipTotal - $form.researchTeamShips - $form.colonyShips;

	$: isConfluence = $gameState.phases[$gameState.phase] === 'confluence';
	$: isBidding =
		isConfluence &&
		$gameState.colonyActiveBidder === undefined &&
		$gameState.researchTeamActiveBidder === undefined;
	$: isColonyTrackActive = $gameState.colonyActiveBidder !== undefined;
	$: isResearchTeamActive = $gameState.researchTeamActiveBidder !== undefined;
	$: activeBidder = isColonyTrackActive
		? $gameState.colonyBidOrder?.[$gameState.colonyActiveBidder!]
		: $gameState.researchTeamBidOrder?.[$gameState.researchTeamActiveBidder!];
</script>

<SuperDebug data={$form} />

{#if isBidding}
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
						on:click={() => myShipsRemaining && $form.colonyShips++}
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
						on:click={() => myShipsRemaining && $form.researchTeamShips++}
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
	</form>
{/if}

<div class="grid">
	<h4 class="h4 place-self-center">Colony Bid Track</h4>
	<div class="overflow-x-scroll w-screen p-2 grid place-items-center">
		<div class="w-fit place-self-center grid gap-2" class:grayscale={activeBidder?.user !== me.id}>
			<ul class="flex w-full justify-around">
				{#each $gameState.colonyBidTrack as { shipMinimum }}
					<li>
						<Resource resource={'ship'} quantity={shipMinimum} />
					</li>
				{/each}
			</ul>
			<ul class="flex gap-2 w-fit">
				{#each $gameState.colonyBidTrack as { card, shipMinimum, reservedBy }, i (card?.id ?? i)}
					<li class="w-64 flex justify-center" animate:flip={{ duration: 250 }}>
						<form
							action="{$page.url.pathname}?/selectConfluenceCard"
							method="post"
							use:selectConfluenceEnhance
							class="relative"
						>
							<input type="hidden" name="cardType" value="Colony" />
							<input type="hidden" name="cardIndex" value={i} />
							<button
								class="border-2 border-transparent rounded-sm"
								class:enabled:hover:border-secondary-400={activeBidder?.user === me.id}
								disabled={Boolean(
									reservedBy ||
										activeBidder?.user !== me.id ||
										shipMinimum > (activeBidder?.shipsUsed || 0)
								)}
								style:border-color={reservedBy && $gameState.gameInfo[reservedBy].raceInfo.color}
							>
								<Card cardInfo={card?.id || ''} displayOnly />
							</button>
							{#if reservedBy}
								<span
									class="absolute px-1 bottom-0 left-0"
									style:background-color={$gameState.gameInfo[reservedBy].raceInfo.color}
								>
									{$gameState.usernameMap[reservedBy]}
								</span>
							{/if}
						</form>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

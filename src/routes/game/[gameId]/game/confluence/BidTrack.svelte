<script lang="ts">
	import Icon from '@iconify/svelte';

	import { fade, slide } from 'svelte/transition';

	import { loadingButton } from '$lib/actions/loadingButton';

	import SkipButton from './SkipButton.svelte';

	import { page } from '$app/stores';
	import Resource from '$lib/components/Resource.svelte';
	import Card from '$lib/components/cards/Card.svelte';
	import type { Colony } from '$lib/types/cards/colony';
	import type { ResearchTeam } from '$lib/types/cards/researchTeam';
	import type { BidTrack } from '$lib/types/game';
	import { getGameState, getMe } from '$lib/util/client/gameContext';
	import { confirmAction } from '$lib/util/client/modals.js';
	import { superFormToastOnError } from '$lib/util/client/toasts.js';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { flip } from 'svelte/animate';
	import { writable, type Readable } from 'svelte/store';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	const toastStore = getToastStore();
	const modalStore = getModalStore();
	const gameState = getGameState();

	type T = $$Generic<Colony | ResearchTeam>;
	export let bidTrack: Readable<BidTrack[]>;
	export let active: boolean = false;
	export let horizontal: boolean = false;

	const me = getMe();

	const data = $page.data as PageData;
	const { enhance: selectConfluenceEnhance, submitting: selectConfluenceSubmitting } = superForm(
		data.selectConfluenceCardForm,
		{
			onError: (e) => superFormToastOnError(toastStore, e),
			onSubmit: ({ cancel }) => confirmAction(modalStore, { onCancel: cancel }),
			warnings: {
				duplicateId: false
			}
		}
	);

	const activeTrackObjIndex = writable(0);
	$: activeTrackObj = $bidTrack[$activeTrackObjIndex];
	let listParent: HTMLUListElement;
	let windowWidth: number;

	let listChildren = $bidTrack.map(() => null) as (HTMLLIElement | null)[];
	function updateScroll() {
		const cursor = listParent.scrollLeft + 0.5 * windowWidth;
		for (let i = 0; i < listChildren.length; i++) {
			const el = listChildren[i];
			if (!el) continue;
			const { offsetLeft, clientWidth } = el;
			if (cursor >= offsetLeft && cursor <= offsetLeft + clientWidth) {
				activeTrackObjIndex.set(i);
				break;
			}
		}
	}
	function scrollTo(index: number) {
		const child = listChildren[index];
		if (!listParent || !child) return;
		listParent.scrollLeft = child.offsetLeft - windowWidth / 2;
	}

	$: isColonyTrackActive = $gameState.colonyActiveBidder !== undefined;
	$: cardType = isColonyTrackActive ? 'Colony' : 'Research Team';
	$: activeBidder = isColonyTrackActive
		? $gameState.colonyBidOrder?.[$gameState.colonyActiveBidder!]
		: $gameState.researchTeamBidOrder?.[$gameState.researchTeamActiveBidder!];
	$: myTurnToBid = activeBidder?.user === me.id && active;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="grid">
	<div class="place-self-center">
		<slot name="title" />
	</div>
	<div class="p-2 grid place-items-center" on:scroll={console.log}>
		<div class="relative w-fit place-self-center grid gap-2 place-items-center">
			<button
				type="button"
				class="z-10 absolute left-5 top-1/2 transform -translate-y-1/2 btn-icon variant-filled-surface"
				on:click={() => scrollTo($activeTrackObjIndex - 1)}
			>
				<Icon icon="material-symbols:chevron-left" />
			</button>
			<button
				type="button"
				class="z-10 absolute right-5 top-1/2 transform -translate-y-1/2 btn-icon variant-filled-surface"
				on:click={() => scrollTo($activeTrackObjIndex + 1)}
			>
				<Icon icon="material-symbols:chevron-right" />
			</button>

			<ul
				class="flex gap-2 w-screen overflow-x-scroll snap-mandatory snap-x scroll-p-0 hide-scrollbar scroll-smooth"
				bind:this={listParent}
				on:scroll={updateScroll}
			>
				<div class="w-screen flex-shrink-0"></div>
				{#each $bidTrack as { cardId, shipMinimum, reservedBy }, i (cardId ?? i)}
					<li
						class="flex-shrink-0 snap-center grid place-items-center gap-4"
						class:w-64={!horizontal}
						class:w-92={horizontal}
						animate:flip={{ duration: 500 }}
						bind:this={listChildren[i]}
						in:fade={{ delay: 500, duration: 300 }}
					>
						<Resource resource={'ship'} quantity={shipMinimum} />

						<div
							class="relative border-2 rounded-md border-transparent"
							style:border-color={reservedBy && $gameState.gameInfo[reservedBy].raceInfo.color}
						>
							<Card cardInfo={cardId || ''} displayOnly />
							{#if reservedBy}
								<span
									class="absolute px-1 bottom-0 left-0"
									style:background-color={$gameState.gameInfo[reservedBy].raceInfo.color}
								>
									{$gameState.usernameMap[reservedBy]}
								</span>
							{/if}
						</div>
					</li>
				{/each}
				<div class="w-screen flex-shrink-0"></div>
			</ul>
			{#if myTurnToBid}
				<div class="w-64 place-self-center grid gap-2" transition:slide>
					<form
						action="{$page.url.pathname}?/selectConfluenceCard"
						method="post"
						use:selectConfluenceEnhance
					>
						<input type="hidden" name="cardType" value={cardType} />
						<input type="hidden" name="cardIndex" value={$activeTrackObjIndex} />

						<button
							class="btn variant-ghost-primary w-full"
							use:loadingButton={{ loading: selectConfluenceSubmitting }}
							disabled={!activeTrackObj ||
								!activeBidder ||
								activeTrackObj.reservedBy ||
								activeTrackObj.shipMinimum > activeBidder.shipsUsed}
						>
							Select
						</button>
					</form>

					<SkipButton />
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	li:snapped {
		background-color: red;
	}
</style>

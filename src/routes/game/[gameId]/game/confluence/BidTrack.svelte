<script lang="ts">
	import SkipButton from './SkipButton.svelte';

	import type { PageData } from './$types';
	import type { ResearchTeam } from '$lib/types/cards/researchTeam';
	import type { Colony } from '$lib/types/cards/colony';
	import type { Readable } from 'svelte/store';
	import { page } from '$app/stores';
	import Resource from '$lib/components/Resource.svelte';
	import Card from '$lib/components/cards/Card.svelte';
	import type { BidTrack } from '$lib/types/game';
	import { getGameState, getMe } from '$lib/util/client/gameContext';
	import { confirmAction } from '$lib/util/client/modals.js';
	import { superFormToastOnError } from '$lib/util/client/toasts.js';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { flip } from 'svelte/animate';
	import { superForm } from 'sveltekit-superforms/client';

	const toastStore = getToastStore();
	const modalStore = getModalStore();
	const gameState = getGameState();

	type T = $$Generic;
	export let bidTrack: Readable<BidTrack<Colony>[]> | Readable<BidTrack<ResearchTeam>[]>;
	export let active: boolean = false;

	const me = getMe();

	const data = $page.data as PageData;
	const { enhance: selectConfluenceEnhance } = superForm(data.selectConfluenceCardForm, {
		onError: (e) => superFormToastOnError(toastStore, e),
		onSubmit: ({ cancel }) => confirmAction(modalStore, { onCancel: cancel }),
		warnings: {
			duplicateId: false
		}
	});

	$: isColonyTrackActive = $gameState.colonyActiveBidder !== undefined;
	$: activeBidder = isColonyTrackActive
		? $gameState.colonyBidOrder?.[$gameState.colonyActiveBidder!]
		: $gameState.researchTeamBidOrder?.[$gameState.researchTeamActiveBidder!];
</script>

<div class="grid">
	<div class="place-self-center">
		<slot name="title" />
	</div>
	<div class="overflow-x-scroll w-screen p-2 grid place-items-center">
		<div class="w-fit place-self-center grid gap-2">
			<ul class="flex w-full justify-around">
				{#each $bidTrack as { shipMinimum }}
					<li>
						<Resource resource={'ship'} quantity={shipMinimum} />
					</li>
				{/each}
			</ul>
			<ul class="flex gap-2 w-fit">
				{#each $bidTrack as { card, shipMinimum, reservedBy }, i (card?.id ?? i)}
					<li class="w-64 flex justify-center" animate:flip={{ duration: 250 }}>
						<form
							action="{$page.url.pathname}?/selectConfluenceCard"
							method="post"
							use:selectConfluenceEnhance
							class="relative grid gap-1"
						>
							<input type="hidden" name="cardType" value="Colony" />
							<input type="hidden" name="cardIndex" value={i} />

							<div
								class="relative border-2 rounded-md border-transparent"
								style:border-color={reservedBy && $gameState.gameInfo[reservedBy].raceInfo.color}
							>
								<Card cardInfo={card?.id || ''} displayOnly />
								{#if reservedBy}
									<span
										class="absolute px-1 bottom-0 left-0"
										style:background-color={$gameState.gameInfo[reservedBy].raceInfo.color}
									>
										{$gameState.usernameMap[reservedBy]}
									</span>
								{/if}
							</div>
							<button
								class="btn variant-ghost-primary w-full"
								disabled={Boolean(
									!active ||
										reservedBy ||
										activeBidder?.user !== me.id ||
										shipMinimum > (activeBidder?.shipsUsed || 0)
								)}
							>
								Select
							</button>
							<SkipButton />
						</form>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

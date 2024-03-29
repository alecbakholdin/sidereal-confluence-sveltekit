<script lang="ts">
	import { getGameState, getMe } from '$lib/util/client/gameContext';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { derived } from 'svelte/store';
	import { slide } from 'svelte/transition';
	import PhaseTrack from '../PhaseTrack.svelte';
	import BidTrack from './BidTrack.svelte';
	import SetBidForm from './SetBidForm.svelte';

	const toastStore = getToastStore();

	const gameState = getGameState();
	const me = getMe();

	$: isConfluence = $gameState.phases[$gameState.phase] === 'confluence';
	$: isBidding =
		isConfluence &&
		$gameState.colonyActiveBidder === undefined &&
		$gameState.researchTeamActiveBidder === undefined &&
		!$gameState.colonyBidOrder?.find((x) => x.user === me.id) &&
		!$gameState.researchTeamBidOrder?.find((x) => x.user === me.id);
	$: isColonyTrackActive = $gameState.colonyActiveBidder !== undefined;
	$: isResearchTeamTrackActive = $gameState.researchTeamActiveBidder !== undefined;
	$: biddingOver = isColonyTrackActive || isResearchTeamTrackActive;
	const activeBidderUserId = derived(gameState, (val) =>
		val.colonyActiveBidder
			? val.colonyBidOrder?.[val.colonyActiveBidder]?.user
			: val.researchTeamActiveBidder
			? val.researchTeamBidOrder?.[val.researchTeamActiveBidder]?.user
			: undefined
	);
	$: if ($activeBidderUserId === me.id)
		toastStore.trigger({ message: "It's your turn to bid!", background: 'variant-filled-primary' });

	const colonyBidTrack = derived(gameState, (state) => state.colonyBidTrack);
	const researchTeamBidTrack = derived(gameState, (state) => state.researchTeamBidTrack);

	$: colonyBidOrderUsers = $gameState.colonyBidOrder?.map(
		(x) => `${$gameState.usernameMap[x.user]} (${x.shipsUsed})`
	);
	$: researchTeamBidOrderUsers = $gameState.researchTeamBidOrder?.map(
		(x) => `${$gameState.usernameMap[x.user]} (${x.shipsUsed})`
	);
</script>

<div class="grid gap-2 place-self-center place-items-center">
	{#if isBidding}
		<div transition:slide>
			<SetBidForm />
		</div>
	{/if}

	{#if !biddingOver || isColonyTrackActive}
		{#if biddingOver}
			<div class="card" transition:slide={{ duration: 100 }}>
				<header class="card-header">
					<h5 class="h5">Colonies</h5>
				</header>
				<div class="p-4 pt-2">
					{#if colonyBidOrderUsers?.length}
						<PhaseTrack
							phaseNames={colonyBidOrderUsers}
							activePhase={$gameState.colonyActiveBidder}
						/>
					{:else}
						<strong class="text-surface-400">No colony bidders</strong>
					{/if}
				</div>
			</div>
		{/if}

		<div transition:slide>
			<BidTrack bidTrack={colonyBidTrack} active={isColonyTrackActive}>
				<h4 class="h4" slot="title">Colony Bid Track</h4>
			</BidTrack>
		</div>
	{/if}

	{#if !biddingOver || isResearchTeamTrackActive}
		{#if biddingOver}
			<div class="card" transition:slide={{ duration: 100 }}>
				<header class="card-header">
					<h5 class="h5">Research Teams</h5>
				</header>
				<div class="p-4 pt-2">
					{#if researchTeamBidOrderUsers?.length}
						<PhaseTrack
							phaseNames={researchTeamBidOrderUsers}
							activePhase={$gameState.researchTeamActiveBidder}
						/>
					{:else}
						<strong class="text-surface-400">No research team bidders</strong>
					{/if}
				</div>
			</div>
		{/if}

		<div transition:slide>
			<BidTrack bidTrack={researchTeamBidTrack} active={isResearchTeamTrackActive} horizontal>
				<h4 class="h4" slot="title">Research Team Bid Track</h4>
			</BidTrack>
		</div>
	{/if}
</div>

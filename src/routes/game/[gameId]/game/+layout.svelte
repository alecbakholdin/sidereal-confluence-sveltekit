<script lang="ts">
	import { page } from '$app/stores';
	import { loadingButton } from '$lib/actions/loadingButton';
	import EntityContainerComponent from '$lib/components/EntityContainerComponent.svelte';
	import {
		getGameContext,
		getGameState,
		getMyPlayerInfo,
		getRootGamePath
	} from '$lib/util/client/gameContext';
	import { superFormToastOnError } from '$lib/util/client/toasts';
	import {
		AppBar,
		AppShell,
		TabAnchor,
		TabGroup,
		getModalStore,
		getToastStore
	} from '@skeletonlabs/skeleton';
	import { derived } from 'svelte/store';
	import { superForm } from 'sveltekit-superforms/client';
	import PhaseTrack from './PhaseTrack.svelte';

	export let data;

	const toastStore = getToastStore();
	const modalStore = getModalStore();
	const rootGamePath = getRootGamePath();
	const myPlayerInfo = getMyPlayerInfo();

	const gameContext = getGameContext();
	const gameState = getGameState();
	const gameId = $gameState.id;
	const tradeTab = `/game/${gameId}/game/trade`;
	const economyTab = `/game/${gameId}/game/economy`;
	const confluenceTab = `/game/${gameId}/game/confluence`;

	$: meInfo = $gameState.gameInfo[gameContext.me.id];
	$: turnInfo = $gameState.turns[$gameState.turn];
	const ready = derived(myPlayerInfo, ({ ready }) => ({
		action: ready ? 'unready' : 'readyUp',
		text: ready ? 'Unready' : 'Ready Up'
	}));

	const { submitting: readySubmitting, enhance: readyEnhance } = superForm(data.emptyForm, {
		onError: (e) => {
			superFormToastOnError(toastStore, e);
		},
		warnings: {
			duplicateId: false
		}
	});
	const { submitting: nextPhaseSubmitting, enhance: nextPhaseEnhance } = superForm(data.emptyForm, {
		onError: (e) => {
			superFormToastOnError(toastStore, e);
		},
		warnings: {
			duplicateId: false
		}
	});
</script>

<AppShell
	slotSidebarLeft="bg-surface-500/5 w-72 p-4"
	slotSidebarRight="bg-surface-500/5 w-0 md:w-72 md:p-4"
	slotFooter="h-20 md:h-0"
	slotPageContent="pb-8"
>
	<svelte:fragment slot="header">
		<AppBar>
			<a href="/">
				<h2 class="h2">Sidereal Confluence</h2>
			</a>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="pageHeader">
		<div class="m-2 p-2 flex flex-col gap-2">
			<div class="info-section">
				<div class="p-2 flex flex-col sm:flex-row gap-3 w-full">
					<div class="flex flex-col gap-1 flex-grow">
						<PhaseTrack
							phaseNames={$gameState.turns.map(({ turnNumber }) => turnNumber)}
							activePhase={$gameState.turn}
						>
							<div class="card p-2 flex flex-col" slot="tooltip" let:i>
								{@const tooltipTurn = $gameState.turns[i]}
								<span>
									<strong>Turn:</strong>
									{tooltipTurn.turnNumber}
								</span>
								<span>
									<strong>Sharing Bonus:</strong>
									{tooltipTurn.sharingBonus}
								</span>
								<span>
									<strong>Yengii Sharing Bonus:</strong>
									{tooltipTurn.yengiiSharingBonus}
								</span>
							</div>
						</PhaseTrack>
						<PhaseTrack phaseNames={$gameState.phases} activePhase={$gameState.phase} />
						<span>
							<strong>Sharing Bonus:</strong>
							{turnInfo.sharingBonus} VP
						</span>
						<span>
							<strong>Yengii Sharing Bonus:</strong>
							{turnInfo.yengiiSharingBonus} VP
						</span>
					</div>
					<div class="flex flex-col gap-2">
						{#if $myPlayerInfo.ready}
							<form action="{rootGamePath}?/unready" method="post" use:readyEnhance>
								<button
									class="btn variant-ghost-secondary"
									use:loadingButton={{ loading: readySubmitting }}
								>
									Unready
								</button>
							</form>
						{:else}
							<form action="{rootGamePath}?/readyUp" method="post" use:readyEnhance>
								<button
									class="btn variant-ghost-secondary"
									use:loadingButton={{ loading: readySubmitting }}
								>
									Ready Up
								</button>
							</form>
						{/if}
						<form action="{rootGamePath}?/nextPhase" method="post" use:nextPhaseEnhance>
							<button
								class="btn variant-ghost-secondary"
								use:loadingButton={{ loading: nextPhaseSubmitting }}
							>
								Next phase
							</button>
						</form>
					</div>
				</div>
			</div>
			<EntityContainerComponent entityContainer={meInfo.resources} title="My Resources" />
		</div>
	</svelte:fragment>

	<TabGroup justify="justify-center">
		<TabAnchor href={tradeTab} selected={$page.url.pathname === tradeTab}>
			<span class="text-sm">Trade</span>
		</TabAnchor>
		<TabAnchor href={economyTab} selected={$page.url.pathname === economyTab}>
			<span class="text-sm">Economy</span>
		</TabAnchor>
		<TabAnchor href={confluenceTab} selected={$page.url.pathname === confluenceTab}>
			<span class="text-sm">Confluence</span>
		</TabAnchor>
		<!-- 		<TabAnchor
			selected={false}
			name="People"
			value={0}
			on:click={() => drawerStore.open({ position: 'right' })}
		>
			Players
		</TabAnchor> -->
		<div class="grid" slot="panel">
			<slot />
		</div>
	</TabGroup>
	<svelte:fragment slot="pageFooter">
		<button
			type="button"
			class="btn"
			on:click={() =>
				modalStore.trigger({
					type: 'alert',
					body: JSON.stringify($gameState),
					modalClasses: '[&>article]:overflow-scroll'
				})}
		>
			Show Game State
		</button>
	</svelte:fragment>
</AppShell>

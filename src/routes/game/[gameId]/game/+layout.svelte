<script lang="ts">
	import { page } from '$app/stores';
	import EntityContainerComponent from '$lib/components/EntityContainerComponent.svelte';
	import { getGameContext } from '$lib/util/client/gameContext';
	import { AppBar, AppShell, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import PhaseTrack from './PhaseTrack.svelte';
	const gameContext = getGameContext();
	const gameState = gameContext.gameState;
	const gameId = $gameState.id;
	const tradeTab = `/game/${gameId}/game/trade`;
	const economyTab = `/game/${gameId}/game/economy`;
	const confluenceTab = `/game/${gameId}/game/confluence`;

	$: meInfo = $gameState.gameInfo[gameContext.me.id];

	let turn = 1;
	let phase = 0;

	function nextPhase() {
		phase = (phase + 1) % $gameState.phases.length;
		if (phase === 0) turn++;
	}
	function prevPhase() {
		phase--;
		if (phase < 0) {
			phase = $gameState.phases.length - 1;
			turn--;
		}
	}
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
				<span>Game Info</span>
				<div class="p-2 flex flex-col gap-1">
					<PhaseTrack phases={[1, 2, 3, 4, 5, 6]} activePhase={turn - 1} />
					<PhaseTrack phases={$gameState.phases} activePhase={phase} />
					<span>
						<strong>Sharing Bonus:</strong>
						6 VP
					</span>
					<span>
						<strong>Yengii Sharing Bonus:</strong>
						3 VP
					</span>
				</div>
				<button type="button" on:click={prevPhase}>prev</button>
				<button type="button" on:click={nextPhase}>next</button>
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
</AppShell>

<script lang="ts">
	import { page } from '$app/stores';
	import { getGameContext } from '$lib/util/client/gameContext';
	import { AppBar, AppShell, TabAnchor, TabGroup, getDrawerStore } from '@skeletonlabs/skeleton';
	const gameContext = getGameContext();
	const gameState = gameContext.gameState;
	const gameId = $gameState.id;
	const tradeTab = `/game/${gameId}/game/trade`;
	const economyTab = `/game/${gameId}/game/economy`;
	const confluenceTab = `/game/${gameId}/game/confluence`;
	let test = 0;
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
	<!-- 	<svelte:fragment slot="sidebarRight">
		<GamePlayerList />
	</svelte:fragment> -->
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

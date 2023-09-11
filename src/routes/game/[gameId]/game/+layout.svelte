<script lang="ts">
	import { getGameContext } from '$lib/util/client/gameContext';
	import { AppBar, AppShell, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import GamePlayerList from './GamePlayerList.svelte';
	import { page } from '$app/stores';

	const gameContext = getGameContext();
	const gameState = gameContext.gameState;
	const gameId = $gameState.id;
	const tradeTab = `/game/${gameId}/game/trade`;
	const economyTab = `/game/${gameId}/game/economy`;
	const confluenceTab = `/game/${gameId}/game/confluence`;
</script>

<AppShell slotSidebarRight="bg-surface-500/5 w-40 md:w-72 p-2 md:p-4" slotFooter="h-20 md:h-0">
	<svelte:fragment slot="header">
		<AppBar>
			<a href="/">
				<h2 class="h2">Sidereal Confluence</h2>
			</a>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		<GamePlayerList />
	</svelte:fragment>
	<TabGroup justify="justify-center">
		<TabAnchor href={tradeTab} selected={$page.url.pathname === tradeTab}>Trade</TabAnchor>
		<TabAnchor href={economyTab} selected={$page.url.pathname === economyTab}>Economy</TabAnchor>
		<TabAnchor href={confluenceTab} selected={$page.url.pathname === confluenceTab}>
			Confluence
		</TabAnchor>
		<svelte:fragment slot="panel"><slot /></svelte:fragment>
	</TabGroup>
</AppShell>

<script lang="ts">
	import { getGameContext } from '$lib/util/client/gameContext';
	import {
		AppBar,
		AppShell,
		Tab,
		TabAnchor,
		TabGroup,
		getDrawerStore
	} from '@skeletonlabs/skeleton';
	import GamePlayerList from './GamePlayerList.svelte';
	import { page } from '$app/stores';
	import { resources } from '$lib/types/resource';
	import Resource from '$lib/components/Resource.svelte';
	const drawerStore = getDrawerStore();
	const gameContext = getGameContext();
	const gameState = gameContext.gameState;
	const gameId = $gameState.id;
	const tradeTab = `/game/${gameId}/game/trade`;
	const economyTab = `/game/${gameId}/game/economy`;
	const confluenceTab = `/game/${gameId}/game/confluence`;
	let test = 0;
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-72 p-4" slotSidebarRight="bg-surface-500/5 w-0 md:w-72 md:p-4"  slotFooter="h-20 md:h-0">
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
		<TabAnchor href={tradeTab} selected={$page.url.pathname === tradeTab}>
			<span class="text-sm">Trade</span>
		</TabAnchor>
		<TabAnchor href={economyTab} selected={$page.url.pathname === economyTab}>
			<span class="text-sm">Economy</span>
		</TabAnchor>
		<TabAnchor href={confluenceTab} selected={$page.url.pathname === confluenceTab}>
			<span class="text-sm">Confluence</span>
		</TabAnchor>
		<TabAnchor
			selected={false}
			name="People"
			value={0}
			on:click={() => drawerStore.open({ position: 'right' })}
		>
			Players
		</TabAnchor>
		<svelte:fragment slot="panel">
			<slot />
		</svelte:fragment>
	</TabGroup>
</AppShell>

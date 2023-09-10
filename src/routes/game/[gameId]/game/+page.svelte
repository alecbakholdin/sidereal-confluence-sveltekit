<script lang="ts">
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import GamePlayerList from './GamePlayerList.svelte';
	import TradeWindow from './TradeWindow.svelte';
</script>

<AppShell slotSidebarRight="bg-surface-500/5 w-72 p-4">
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
    <TradeWindow/>
</AppShell>

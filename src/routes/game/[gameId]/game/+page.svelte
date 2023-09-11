<script lang="ts">
	import { AppBar, AppShell, Tab, TabGroup } from '@skeletonlabs/skeleton';
	import GamePlayerList from './GamePlayerList.svelte';
	import TradeWindow from './TradeWindow.svelte';

	let tab = 0;
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
    <TradeWindow/>
</AppShell>

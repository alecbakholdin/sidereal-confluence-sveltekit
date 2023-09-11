<script>
	import RaceSelection from './RaceSelection.svelte';
	import UserList from './LobbyPlayerList.svelte';
	import StartButton from './StartButton.svelte';
</script>

<div class="grid sm:grid-cols-[2fr_1fr] h-fit h-120 gap-3 [&>div:first-child]:h-120">
	<RaceSelection />
	<div class="flex flex-col h-full [&>div:first-child]:flex-grow gap-3">
		<UserList />
		<StartButton />
	</div>
</div>

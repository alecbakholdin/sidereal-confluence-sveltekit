<script>
	import RaceSelection from './RaceSelection.svelte';
	import UserList from './PlayerList.svelte';
	import StartButton from './StartButton.svelte';
</script>

<div class="grid grid-cols-[2fr_1fr] h-80 gap-3">
	<RaceSelection />
	<div class="flex flex-col h-full [&>div:first-child]:flex-grow gap-3">
		<UserList />
		<StartButton />
	</div>
</div>

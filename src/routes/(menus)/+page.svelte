<script>
	import MenuLink from "$lib/components/MenuLink.svelte";

</script>
<div
	class="w-full h-full flex flex-col items-center space-y-3 justify-center"
>
	<h1 class="h1 py-8">Sidereal Confluence</h1>
	<MenuLink href="/newgame">
		<h4 class="h4 text-primary-400 py-2 px-4">NEW GAME</h4>
	</MenuLink>
	<MenuLink href="/">
		<h4 class="h4 text-primary-400 py-2 px-4">Settings</h4>
	</MenuLink>
</div>

<script>
	import MenuLink from "$lib/components/MenuLink.svelte";

</script>
<div
	class="background-planet w-screen h-screen flex flex-col items-center justify-center space-y-2"
>
	<h1 class="h1 py-8">Sidereal Confluence</h1>
	<MenuLink href="/">
		<h4 class="h4 text-primary-400 py-2 px-4">Settings</h4>
	</MenuLink>
	<MenuLink href="/">
		<h4 class="h4 text-primary-400 py-2 px-4">Settings</h4>
	</MenuLink>
	<MenuLink href="/">
		<h4 class="h4 text-primary-400 py-2 px-4">Settings</h4>
	</MenuLink>
	<MenuLink href="/">
		<h4 class="h4 text-primary-400 py-2 px-4">Settings</h4>
	</MenuLink>
</div>

<style>
	.background-planet {
		background-image: url('/images/menacing-planet.png');
		background-position-x: center;
		background-position-y: top;
		object-fit: fill;
	}
</style>

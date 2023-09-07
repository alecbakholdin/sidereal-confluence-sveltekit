<script lang="ts">
	import { sound } from '$lib/actions/sound';

	export let href: string;
	export let anchorClass: string = '';
</script>

<a
	class="menuButton border rounded-sm border-primary-400 {anchorClass}"
	{href}
	use:sound={{src: '/sounds/buttonBeep.mp3', events: ['mouseover']}}
>
	<slot />
</a>

<style>
	.menuButton {
		background-image: linear-gradient(
			-70deg,
			transparent 0%,
			transparent 50%,
			rgb(var(--color-primary-800)) 50%,
			rgb(var(--color-primary-800)) 100%
		);
		background-size: 300%;
		background-position: 100% -200%;
		transition: background-position 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
	}
	.menuButton:hover {
		background-position: 0;
	}
</style>

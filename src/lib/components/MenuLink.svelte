<script lang="ts">
	import { cubicIn } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	export let href: string;
	export let anchorClass: string = '';

	let volume = tweened(0, {
		duration: 100,
		easing: cubicIn
	});
	let currentTime = 0;
	function handleMouseEnter() {
		currentTime = 0;
		$volume = 1;
		paused = false;
	}
	function handleMouseLeave() {
		$volume = 0;
	}
	$: paused = !$volume;
	$: if (!$volume) currentTime = 0;
</script>

<a
	class="menuButton border-2 border-primary-400 {anchorClass}"
	{href}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
>
	<audio bind:paused bind:currentTime volume={$volume} src="/sounds/buttonBeep.mp3" />
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

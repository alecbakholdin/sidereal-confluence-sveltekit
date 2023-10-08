<script lang="ts">
	import 'iconify-icon';
	import '../app.postcss';

	import { onNavigate } from '$app/navigation';
	import { settingsModal } from '$lib/util/client/settingsStore';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import {
		Modal,
		Toast,
		getModalStore,
		initializeStores,
		storePopup
	} from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { makeHullPresorted } from '@melt-ui/svelte/internal/helpers';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();
	const modalStore = getModalStore();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	let windowWidth: number;
	let windowHeight: number;
	$: widthRatio = windowWidth/1920;
	$: heightRatio = windowHeight/1080;
	$: numStars = Math.floor(widthRatio * heightRatio * 100)
	function quickHash(a: number) {
		a = a ^ 61 ^ (a >> 16);
		a = a + (a << 3);
		a = a ^ (a >> 4);
		a = a * 0x27d4eb2d;
		a = a ^ (a >> 15);
		return a;
	}
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight}/>

<div class="-z-10 h-0 relative">
	<ul class="absolute -z-10 top-0 left-0 w-screen h-screen" id="stars-bg">
		{#each { length: numStars } as _, i}
			<li
				class:text-xs={!(i % 3)}
				class:text-sm={!(i % 5)}
				class="star absolute -z-10 animate-pulse"
				style:animation-delay="{(i % 10) * 100}ms"
				style:animation-duration="2s"
				style:left="{quickHash(i) % 100}%"
				style:top="{quickHash(i + 1) % 100}%"
			>
				<Icon icon="mdi:star-four-points" />
			</li>
		{/each}
	</ul>
</div>

<button
	type="button"
	class="btn-icon bg-surface-hover-token fixed z-20 top-0 right-0 p-2 w-fit m-2"
	on:click={() => modalStore.trigger(settingsModal)}
>
	<iconify-icon class="text-4xl" icon="material-symbols:settings" />
</button>
<slot />

<Toast />
<Modal />

<style lang="postcss">
	#stars-bg {
		background: radial-gradient(ellipse at bottom, #211b32 0%, #090a0f 75%);
	}
	.star {
		position: absolute;
		aspect-ratio: 1;
	}
</style>

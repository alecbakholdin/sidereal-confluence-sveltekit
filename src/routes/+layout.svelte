<script lang="ts">
	import 'iconify-icon';
	import '../app.postcss';

	import { onNavigate } from '$app/navigation';
	import { settingsModal } from '$lib/util/client/settingsStore';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import Icon from '@iconify/svelte';
	import {
		Modal,
		Toast,
		getModalStore,
		initializeStores,
		storePopup
	} from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
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

	//logic for stars + shooting stars
	const maxDistance = distanceFromCenter(100, 100);
	let windowWidth: number;
	let windowHeight: number;
	$: widthRatio = windowWidth / 1920;
	$: heightRatio = windowHeight / 1080;
	$: numStars = Math.floor(widthRatio * heightRatio * 100);
	$: numShootingStars = $page.url.pathname === '/' ? Math.ceil(widthRatio * heightRatio * 10) : 0;

	function distanceFromCenter(a: number, b: number) {
		return Math.sqrt((a - 50) * (a - 50) + (b - 50) * (b - 50));
	}
	function quickHash(a: number) {
		a = a ^ 61 ^ (a >> 16);
		a = a + (a << 3);
		a = a ^ (a >> 4);
		a = a * 0x27d4eb2d;
		a = a ^ (a >> 15);
		return a;
	}
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<div class="-z-10 h-0 relative">
	<ul class="absolute -z-10 top-0 left-0 w-screen h-screen" id="stars-bg">
		{#each { length: numStars } as _, i}
			{@const left = quickHash(i + 111) % 100}
			{@const top = quickHash(i + 1) % 100}
			{@const distance = distanceFromCenter(top, left)}
			{#if distance / maxDistance > 0.2}
				<li
					class:text-xs={!(i % 3)}
					class:text-sm={!(i % 5)}
					class="absolute -z-10 animate-pulse"
					style:animation-delay="{(i % 10) * 100}ms"
					style:animation-duration="2s"
					style:left="{left}%"
					style:top="{top}%"
				>
					<Icon icon="mdi:star-four-points" />
				</li>
			{/if}
		{/each}
		{#each { length: numShootingStars } as _, i}
			<li
				class="shooting-star"
				style:left="initial"
				style:top="{i % 2 ? quickHash(42 + i) % 90 : 0}%"
				style:right="{!(i % 2) ? quickHash(37 + i) % 70 : 0}%"
				style:animation-duration="{8 * (quickHash(i) % 3) + 1})s"
				style:animation-delay="{(i / 8) * 3}s"
			></li>
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
	.shooting-star {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 4px;
		height: 4px;
		background: #fff;
		border-radius: 50%;
		box-shadow:
			0 0 0 4px rgba(255, 255, 255, 0.1),
			0 0 0 8px rgba(255, 255, 255, 0.1),
			0 0 20px rgba(255, 255, 255, 0.1);
		animation: shooting-star-animate 2s linear infinite;
	}
	.shooting-star::before {
		content: '';
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 300px;
		height: 1px;
		background: linear-gradient(90deg, #fff, transparent);
	}

	@keyframes shooting-star-animate {
		0% {
			transform: rotate(315deg) translateX(0);
			opacity: 1;
		}
		35% {
			opacity: 1;
		}
		50% {
			transform: rotate(315deg) translateX(-1000px);
			opacity: 0;
		}
		100% {
			transform: rotate(315deg) translateX(-1000px);
			opacity: 0;
		}
	}
</style>

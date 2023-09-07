<script>
	import { settingsModal } from '$lib/util/settingsStore';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
</script>

<div class="background-planet w-screen h-screen relative grid place-items-center">
	<slot />
</div>

<style>
	.background-planet {
		background-image: url('/images/menacing-planet.png');
		background-position-x: center;
		background-position-y: top;
		object-fit: fill;
	}
</style>

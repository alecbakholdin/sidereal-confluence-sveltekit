<script>
	import { settingsModal } from '$lib/util/settingsStore';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
</script>

<div class="background-planet w-screen h-screen relative">
	<button
		type="button"
		class="btn-icon bg-surface-hover-token absolute top-0 right-0 p-2 w-fit m-2"
		on:click={() => modalStore.trigger(settingsModal)}
	>
		<iconify-icon class="text-4xl" icon="material-symbols:settings" />
	</button>
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

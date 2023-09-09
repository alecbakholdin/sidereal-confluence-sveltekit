<script>
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
</script>

<button
	type="button"
	class="btn-icon bg-surface-hover-token fixed z-10 top-0 right-0 p-2 w-fit m-2"
	on:click={() => modalStore.trigger(settingsModal)}
>
	<iconify-icon class="text-4xl" icon="material-symbols:settings" />
</button>
<slot />
<Toast />
<Modal />

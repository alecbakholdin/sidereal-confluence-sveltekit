<script>
	import 'iconify-icon';
	import '../app.postcss';

	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';
	import { settingsModal } from '$lib/util/client/settingsStore';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import {
		Modal,
		Toast,
		getModalStore,
		getToastStore,
		initializeStores,
		storePopup
	} from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();
	const modalStore = getModalStore();
	const toastStore = getToastStore();
	
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
	
	const { message } = superForm($page.data.emptyForm);
	$: if ($message) {
		toastStore.trigger(typeof $message === 'string' ? { message: $message } : $message);
		$message = null;
	}
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

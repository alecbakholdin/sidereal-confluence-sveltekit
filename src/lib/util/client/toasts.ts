import type { ToastStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';
import type { SuperValidated, UnwrapEffects } from 'sveltekit-superforms';

export function superFormToastOnError<T, M>(
	toastStore: ToastStore,
	event: {
		result: {
			type: 'error';
			status?: number;
			error: App.Error;
		};
		message: Writable<SuperValidated<UnwrapEffects<T>, M>['message']>;
	}
) {
	const { error } = event.result;
	const message = typeof error === 'string' ? error : error.message;
	toastStore.trigger({
		message,
		background: 'variant-ghost-error'
	});
}

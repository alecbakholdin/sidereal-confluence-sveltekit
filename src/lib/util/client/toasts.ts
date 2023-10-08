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
	toastError(toastStore, message);
}

export function toastErrorMessage(toastStore: ToastStore, message: Writable<any>) {
	message.subscribe((update: string | App.Error) => {
		if(!update) return;
		console.error(update);
		if (typeof update === 'string') {
			toastError(toastStore, update);
		} else {
			toastError(toastStore, update.message);
		}
		message.set(undefined);
	});
}

export function toastError(toastStore: ToastStore, message: string) {
	toastStore.trigger({
		message,
		background: 'variant-filled-error'
	});
}

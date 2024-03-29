import { enhance } from '$app/forms';
import { toastError } from '$lib/util/client/toasts';
import type { ToastStore } from '@skeletonlabs/skeleton';
import { writable } from 'svelte/store';

export function toastOnError(formElement: HTMLFormElement, toastStore: ToastStore) {
	return enhance(formElement, () => {
		return async ({ result }) => {
			if (result.type === 'failure') {
				if (result.data?.['form']) {
					const form = Object(result.data.form);
					const msg =
						typeof form.message === 'string' ? form.message : String(form.message.message);
					toastError(toastStore, msg);
				} else if (result.data) {
					toastError(toastStore, String(result.data?.['message']));
				}
			} else if (result.type === 'error') {
				const msg = typeof result.error === 'string' ? result.error : String(result.error.message);
				toastError(toastStore, msg);
			}
		};
	});
}

export function initEmptyForm(toastStore: ToastStore) {
	const loading = writable(false);
	return {
		enhance: (formElement: HTMLFormElement) =>
			enhance(formElement, () => {
				loading?.set(true);
				return async ({ result }) => {
					loading?.set(false);
					if (result.type === 'failure') {
						if (result.data?.['form']) {
							const form = Object(result.data.form);
							const msg =
								typeof form.message === 'string' ? form.message : String(form.message.message);
							toastError(toastStore, msg);
						} else if (result.data) {
							toastError(toastStore, String(result.data?.['message']));
						}
					} else if (result.type === 'error') {
						const msg =
							typeof result.error === 'string' ? result.error : String(result.error.message);
						toastError(toastStore, msg);
					}
				};
			}),
		loading
	};
}

/**
 * @typedef Settings
 * @property {number} volume
 */

import SettingsModal from '$lib/components/SettingsModal.svelte';
import { localStorageStore } from '@skeletonlabs/skeleton';

/** @type {import("svelte/store").Writable<Settings>} */
export const settings = localStorageStore('userSettings', { volume: 1 });

/** @type {import('@skeletonlabs/skeleton').ModalSettings} */
export const settingsModal = {
	type: 'component',
	component: {
		ref: SettingsModal,
	}
};

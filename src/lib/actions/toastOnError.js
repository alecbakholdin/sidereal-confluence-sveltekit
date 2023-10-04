import { enhance } from "$app/forms";
import { toastError } from "$lib/util/client/toasts";

/** @type {import("svelte/action").Action<HTMLFormElement, import("@skeletonlabs/skeleton").ToastStore>} */
export function toastOnError(formElement, toastStore) {
    return enhance(formElement, () => {
        return async ({result}) => {
            if(result.type === 'failure') {
                if(result.data?.['form']) {
                    const form = Object(result.data.form);
                    const msg = typeof form.message === 'string' ? form.message : String(form.message.message)
                    toastError(toastStore, msg);
                } else if(result.data) {
                    toastError(toastStore, String(result.data?.['message']))
                }
            } else if(result.type === 'error') {
                const msg = typeof result.error === 'string' ? result.error : String(result.error.message)
                toastError(toastStore, msg);
            }
        }
    })
}
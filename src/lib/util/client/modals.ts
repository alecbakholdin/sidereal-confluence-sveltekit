import type { ModalStore } from "@skeletonlabs/skeleton";
export type ConfirmModalOptions = 
    {
        title?: string,
        prompt?: string,
        onCancel?: () => unknown,
        onConfirm?: () => unknown
    }

export async function confirmAction(modalStore: ModalStore, opts: ConfirmModalOptions) {
    return new Promise(resolve => {
        modalStore.trigger({
            type: 'confirm',
            title: opts.title || 'Confirm',
            body: opts.prompt || 'Are you sure?',
            async response(r: boolean) {
                if (r && opts.onConfirm)
                    await opts.onConfirm()
                else if (!r && opts.onCancel)
                    await opts.onCancel();
                resolve(null);
            }
        })
    })
}
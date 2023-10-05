<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { superFormToastOnError } from '$lib/util/client/toasts';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { slide } from 'svelte/transition';
	import { loadingButton } from '$lib/actions/loadingButton';

	const toastStore = getToastStore();
	const { enhance, submitting } = superForm(($page.data as PageData).emptyForm, {
		onError: (e) => superFormToastOnError(toastStore, e),
		warnings: {
			duplicateId: false
		}
	});
</script>

<form
	action="{$page.url.pathname}?/skip"
	method="post"
	use:enhance
	transition:slide={{ duration: 50 }}
    class="w-full"
>
	<button class="btn variant-ghost-error w-full" use:loadingButton={{ loading: submitting }}>
		Skip Bid
	</button>
</form>

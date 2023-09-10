<script lang="ts">
	import { page } from '$app/stores';
	import { highlight } from '$lib/actions/highlight';
	import { loadingButton } from '$lib/actions/loadingButton';
	import FormFieldError from '$lib/components/FormFieldError.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;
	const redirectUrl = $page.url.searchParams.get('redirect') || '/';
	const { form, enhance, submitting, errors } = superForm(data.usernameForm);
</script>

<form
	action="{$page.url.pathname}?redirect={redirectUrl}"
	method="POST"
	use:enhance
	class="w-[300px]"
>
	<div class="flex items-end space-x-3">
		<div>
			<label class="label" for="username">Username</label>
			<input
				type="text"
				class="input"
				name="username"
				placeholder="Username"
				bind:value={$form.username}
				use:highlight
			/>
		</div>
		<div>
			<button type="submit" class="btn variant-ghost" use:loadingButton={{ loading: submitting }}>
				Submit
			</button>
		</div>
	</div>
	<FormFieldError errors={$errors.username} />
</form>

<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import FormFieldError from '$lib/components/FormFieldError.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { highlight } from '$lib/actions/highlight';

	export let data: PageData;
	const redirectUrl = $page.url.searchParams.get('redirect') || '/';
	const { form, enhance, submitting, errors } = superForm(data.usernameForm, {
		async onResult({ result }) {
			if (result.type !== 'success') return;
			setTimeout(() => goto(redirectUrl, {
				replaceState: true,
				invalidateAll: true
			}), 50);
		}
	});
</script>

<form action={$page.url.pathname} method="POST" use:enhance class="w-[300px]">
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
			<button type="submit" class="btn variant-ghost" disabled={$submitting}>
				{#if $submitting}
					<ProgressRadial width="w-6" />
				{:else}
					Submit
				{/if}
			</button>
		</div>
	</div>
	<FormFieldError errors={$errors.username} />
</form>
<script lang="ts">
	import { getGameContext } from '$lib/util/client/gameContext';
	import { superForm } from 'sveltekit-superforms/client';
	import TradeEntitySelector from './TradeEntitySelector.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { loadingButton } from '$lib/actions/loadingButton';

	const gameContext = getGameContext();
	const gameState = gameContext.gameState;

	export let data: PageData;
	const { form, enhance, submitting } = superForm(data.updateTradePreferencesForm, {
		dataType: 'json'
	});
</script>

<form action="{$page.url.pathname}?/updateTradePreferences" method="POST" use:enhance class="flex justify-center">
	<div class="w-fit flex flex-col gap-3">
		<div class="grid grid-cols-2 w-fit place-items-center gap-3">
			<span>Offering</span>
			<span>Looking For</span>
			<TradeEntitySelector bind:entityContainer={$form.offering} />
			<TradeEntitySelector bind:entityContainer={$form.lookingfor} />
		</div>
		<input class="input" type="text" placeholder="Note" name="note" bind:value={$form.note} />
		<button class="btn variant-outline" use:loadingButton={{ loading: submitting }}>Submit</button>
	</div>
</form>

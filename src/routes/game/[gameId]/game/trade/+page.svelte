<script lang="ts">
	import { getGameContext } from '$lib/util/client/gameContext';
	import { superForm } from 'sveltekit-superforms/client';
	import TradeEntitySelector from './TradeEntitySelector.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { loadingButton } from '$lib/actions/loadingButton';
	import GamePlayer from './GamePlayer.svelte';

	const gameContext = getGameContext();
	const gameState = gameContext.gameState;

	export let data: PageData;
	const { form, enhance, submitting } = superForm(data.updateTradePreferencesForm, {
		dataType: 'json'
	});
	let height: number;
</script>

<div class="flex flex-col sm:flex-row justify-center px-4 gap-5">
	<form
		action="{$page.url.pathname}?/updateTradePreferences"
		method="POST"
		use:enhance
		class="flex justify-center"
		bind:clientHeight={height}
	>
		<div class="w-fit flex flex-col gap-3">
			<div class="grid grid-cols-2 w-fit place-items-center gap-3">
				<span>Offering</span>
				<span>Looking For</span>
				<TradeEntitySelector bind:entityContainer={$form.offering} />
				<TradeEntitySelector bind:entityContainer={$form.lookingfor} />
			</div>
			<input
				class="input"
				type="text"
				placeholder="Note"
				name="note"
				autocomplete="off"
				bind:value={$form.note}
			/>
			<button class="btn variant-outline" use:loadingButton={{ loading: submitting }}>
				Submit
			</button>
		</div>
	</form>
	<div class="flex flex-col gap-y-3 sm:overflow-y-scroll items-center" style:height="{height || 0}px">
		{#each $gameState.players as playerId (playerId)}
			<GamePlayer {playerId} />
		{/each}
	</div>
</div>

<script lang="ts">
	import { page } from '$app/stores';
	import { loadingButton } from '$lib/actions/loadingButton';
	import type { GameState } from '$lib/types/game';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { LayoutData } from './$types';
	import TradeEntitySelector from './trade/TradeEntitySelector.svelte';
	import { onMount } from 'svelte';
	import type { TradeProposal } from '$lib/types/trade';

	const modalStore = getModalStore();

	export let playerId: string;
	export let mePlayerId: string;
	export let gameState: GameState;
	export let initialTradeProposal: TradeProposal | undefined = undefined;

	const data = $page.data as LayoutData;

	const { form, enhance, message, submitting, errors } = superForm(data.tradeProposalForm, {
		dataType: 'json',
		onResult: ({ result }) => {
			if (result.type === 'success') {
				modalStore.close();
			}
		}
	});
	onMount(() => {
		if (initialTradeProposal) {
			$form = initialTradeProposal;
		} else {
			$form.srcPlayerId = mePlayerId;
			$form.destPlayerId = playerId;
		}
	});
</script>

<div class="card">
	<header class="card-header flex justify-between items-center">
		<h4 class="h4">Trade Proposal</h4>
		<button type="button" class="btn-icon variant-soft-surface" on:click={modalStore.close}>
			<iconify-icon icon="mdi:remove" />
		</button>
	</header>
	<section class="p-4">
		<form action="/game/{data.gameState.id}/game/trade?/proposeTrade" method="POST" use:enhance>
			<div class="grid grid-cols-2 place-items-center gap-3">
				<span>Me</span>
				<span>{gameState.usernameMap[playerId]}</span>
				<TradeEntitySelector bind:entityContainer={$form.offering} />
				<TradeEntitySelector bind:entityContainer={$form.askingFor} />
			</div>
			<button
				type="submit"
				class="btn btn-lg variant-outline"
				use:loadingButton={{ loading: submitting }}
			>
				Create
			</button>
			{#if $message}
				<aside class="alert variant-soft-primary">
					{$message}
				</aside>
			{/if}
		</form>
		<!-- 		<SuperDebug data={$form}/> -->
	</section>
</div>
<slot />

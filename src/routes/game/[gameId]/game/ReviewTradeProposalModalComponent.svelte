<script lang="ts">
	import { page } from '$app/stores';
	import { loadingButton } from '$lib/actions/loadingButton';
	import EntityContainerComponent from '$lib/components/EntityContainerComponent.svelte';
	import type { TradeProposal } from '$lib/types/trade';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { LayoutData } from './$types';
	import TradeProposalModalComponent from './TradeProposalModalComponent.svelte';
	import type { GameState } from '$lib/types/game';
	import type { Writable } from 'svelte/store';

	const modalStore = getModalStore();
	export let tradeProposal: TradeProposal;
	export let gameState: Writable<GameState>;

	const data = $page.data as LayoutData;
	const { form, enhance, submitting, message } = superForm(data.tradeProposalForm, {
		dataType: 'json',
		onResult: ({ result }) => result.type === 'success' && modalStore.close()
	});

	onMount(() => ($form = tradeProposal));

	function modifyProposal() {
		modalStore.trigger({
			type: 'component',
			component: {
				ref: TradeProposalModalComponent,
				props: {
					gameState: $gameState,
                    playerId: $form.srcPlayerId,
					initialTradeProposal: {
						srcPlayerId: $form.destPlayerId,
						destPlayerId: $form.srcPlayerId,
						askingFor: $form.offering,
						offering: $form.askingFor,
						note: $form.note
					} as TradeProposal
				}
			}
		});
		modalStore.close();
	}
</script>

<div class="card">
	<header class="card-header">
		<h4 class="h4">Review Proposal</h4>
	</header>
	<section class="p-4">
		<div class="grid grid-cols-[1fr_auto_1fr] w-full place-items-center gap-2">
			<EntityContainerComponent title={'You'} entityContainer={tradeProposal.askingFor} />
			<iconify-icon icon="uil:exchange" />
			<EntityContainerComponent title={'Them'} entityContainer={tradeProposal.offering} />
		</div>
		{#if $message}
			<aside class="alert variant-filled-soft">{$message}</aside>
		{/if}
	</section>
	<footer class="card-footer flex flex-col justify-between gap-2">
		<form
			action="/game/{data.gameState.id}/game/trade?/confirmTrade"
			method="post"
			use:enhance
			class="w-full"
		>
			<button
				type="submit"
				class="btn variant-soft-success w-full"
				use:loadingButton={{ loading: submitting }}
			>
				Accept
			</button>
		</form>
		<button type="button" class="btn variant-soft-error" on:click={modalStore.close}>Reject</button>
		<button type="button" class="btn variant-soft-surface" on:click={modifyProposal}>Modify</button>
	</footer>
</div>

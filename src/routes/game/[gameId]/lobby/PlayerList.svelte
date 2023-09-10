<script lang="ts">
	import { page } from '$app/stores';
	import { getGameContext } from '$lib/util/client/gameContext';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { confirmAction } from '$lib/util/client/modals';
	import ReadyButton from './ReadyButton.svelte';
	const gameContext = getGameContext();
	const modalStore = getModalStore();

	const gameState = gameContext.gameState;
	const onlineMembers = gameContext.onlineMembers;
	const { enhance } = superForm(($page.data as PageData).kickUserForm, {
		async onSubmit({ formData, cancel }) {
			console.log('submitting');
			const playerId = formData.get('playerId')?.toString() || '';
			const username = $gameState.usernameMap[playerId];
			await confirmAction(modalStore, {
				prompt: `Are you sure you want to kick ${username}?`,
				onCancel: cancel
			});
		}
	});
</script>

<div class="card variant-ghost flex flex-col">
	<header class="card-header">
		<h4 class="h4">Players</h4>
	</header>
	<section class="p-4 w-64 flex-grow flex flex-col justify-between">
		<div class="grid grid-cols-[auto_1fr_auto] gap-x-2">
			{#each $gameState.players as playerId (playerId)}
				{#if $gameState.lobbyInfoMap[playerId].ready}
					<iconify-icon icon="material-symbols:check" class="text-success-400 place-self-center"/>
				{:else if gameContext.me.id === playerId}
					<iconify-icon icon="material-symbols:person" class="place-self-center" />
				{:else}
					<div
						class="place-self-center rounded-full w-2 h-2 border"
						class:bg-gray-400={!$onlineMembers.find(({ id }) => id === playerId)}
						class:bg-success-400={$onlineMembers.find(({ id }) => id === playerId)}
					/>
				{/if}
				<span class="overflow-ellipsis">{$gameState.usernameMap[playerId] || 'loading...'}</span>
				{#if gameContext.me.id === playerId}
					<div />
				{:else}
					<form action="{$page.url.pathname}?/kickUser" method="POST" use:enhance>
						<input type="hidden" name="playerId" value={playerId} />
						<button type="submit"><iconify-icon icon="mdi:remove" /></button>
					</form>
				{/if}
			{/each}
		</div>
		<div class="w-full flex justify-end">
			<ReadyButton />
		</div>
	</section>
</div>

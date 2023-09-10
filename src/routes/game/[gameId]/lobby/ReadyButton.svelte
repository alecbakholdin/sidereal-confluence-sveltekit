<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { getGameContext } from '$lib/util/client/gameContext';

	const gameContext = getGameContext();
	const gameState = gameContext.gameState;

	const toastStore = getToastStore();
	const { enhance, message } = superForm(($page.data as PageData).toggleReadyForm);
	$: if ($message) {
		toastStore.trigger({ message: $message });
		$message = null;
	}
</script>

<form action="{$page.url.pathname}?/toggleReady" method="POST" use:enhance>
	<button type="submit" class="btn btn-sm variant-ghost">
		{$gameState.lobbyInfoMap[gameContext.me.id].ready ? 'Unready' : 'Ready'}
	</button>
</form>

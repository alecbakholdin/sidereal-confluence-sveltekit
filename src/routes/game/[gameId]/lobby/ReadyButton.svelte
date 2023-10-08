<script lang="ts">
	import { page } from '$app/stores';
	import { getGameContext } from '$lib/util/client/gameContext';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { toastErrorMessage } from '$lib/util/client/toasts';

	const gameContext = getGameContext();
	const gameState = gameContext.gameState;
	const toastStore = getToastStore();

	const { enhance, message } = superForm(($page.data as PageData).readyForm);
	toastErrorMessage(toastStore, message);
</script>

<form action="{$page.url.pathname}?/toggleReady" method="POST" use:enhance>
	<button type="submit" class="btn btn-sm variant-ghost">
		{$gameState.lobbyInfoMap[gameContext.me.id].ready ? 'Unready' : 'Ready'}
	</button>
</form>

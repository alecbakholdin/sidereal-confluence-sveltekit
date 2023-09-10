<script lang="ts">
	import { page } from '$app/stores';
	import { getGameContext } from '$lib/util/client/gameContext';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	const gameContext = getGameContext();
	const gameState = gameContext.gameState;

	const { enhance, message } = superForm(($page.data as PageData).emptyForm, {
		warnings: { duplicateId: false }
	});
</script>

<form action="{$page.url.pathname}?/toggleReady" method="POST" use:enhance>
	<button type="submit" class="btn btn-sm variant-ghost">
		{$gameState.lobbyInfoMap[gameContext.me.id].ready ? 'Unready' : 'Ready'}
	</button>
</form>

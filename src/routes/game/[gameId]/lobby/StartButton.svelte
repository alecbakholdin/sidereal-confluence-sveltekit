<script lang="ts">
	import { getGameContext } from '$lib/util/client/gameContext';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { loadingButton } from '$lib/actions/loadingButton';

	const gameContext = getGameContext();
	const gameState = gameContext.gameState;

	$: allReady = !Object.values($gameState.lobbyInfoMap).find(({ ready }) => !ready);
	const { enhance, submitting } = superForm(($page.data as PageData).emptyForm, {
		warnings: { duplicateId: false }
	});
</script>

<form action="{$page.url.pathname}?/startGame" method="POST" use:enhance>
	<button
		class="btn btn-lg variant-ghost w-full"
		disabled={!allReady}
		use:loadingButton={{ loading: submitting }}
	>
		Start Game
	</button>
</form>

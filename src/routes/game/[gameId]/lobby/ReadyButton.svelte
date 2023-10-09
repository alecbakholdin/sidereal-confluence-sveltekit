<script lang="ts">
	import { page } from '$app/stores';
	import { initEmptyForm } from '$lib/actions/toastOnError';
	import { getGameContext } from '$lib/util/client/gameContext';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const gameContext = getGameContext();
	const gameState = gameContext.gameState;
	const toastStore = getToastStore();

	$: phase = $gameState.phases[$gameState.phase];

	const {enhance, loading} = initEmptyForm(toastStore);
</script>

<form
	action="{$page.url.pathname}?/toggleReady"
	method="POST"
	use:enhance
>
	<button type="submit" class="btn btn-sm variant-ghost">
		{$gameState.lobbyInfoMap[gameContext.me.id].ready ? 'Unready' : 'Ready'}
	</button>
</form>

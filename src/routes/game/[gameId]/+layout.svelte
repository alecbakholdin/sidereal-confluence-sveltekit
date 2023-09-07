<script lang="ts">
	import { page } from '$app/stores';
	import { gameStateStore, joinGame } from '$lib/util/gameStore';
	import { onMount } from 'svelte';

	onMount(() => {
		joinGame($page.params.gameId);
	});
</script>

<div class="w-full h-full grid place-items-center">
    {JSON.stringify($gameStateStore)}
	<slot />
</div>

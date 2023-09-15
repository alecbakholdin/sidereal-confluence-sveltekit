<script lang="ts">
	import type { TradeEntity } from '$lib/types/trade';
	import { getGameContext } from '$lib/util/client/gameContext';
	import { writable, type Writable } from 'svelte/store';
	import TradeEntitySelector from './TradeEntitySelector.svelte';

	const gameContext = getGameContext();
	const gameState = gameContext.gameState;
	let entities: Writable<TradeEntity[]> = writable([]);
</script>

<form class="m-1 p-2">
	<TradeEntitySelector {entities} />
</form>

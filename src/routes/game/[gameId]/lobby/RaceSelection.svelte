<script lang="ts">
	import { page } from '$app/stores';
	import { raceInfo, type RaceType } from '$lib/types/race';
	import { getGameContext } from '$lib/util/client/gameContext';
	import { derived } from 'svelte/store';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();
	const gameContext = getGameContext();
	const gameState = gameContext.gameState;

	const disabledRaces = derived(gameState, ({ lobbyInfoMap }) =>
		Object.values(lobbyInfoMap)
			.filter(({ ready }) => ready)
			.map(({ race }) => race)
	);
	$: me = $gameState.lobbyInfoMap[gameContext.me.id];
	let selectedRace: RaceType | undefined = $gameState.lobbyInfoMap[gameContext.me.id].race;

	const { enhance, message } = superForm(($page.data as PageData).chooseRaceSchema, {
		onSubmit({ formData }) {
			selectedRace = formData.get('race')?.toString() as RaceType;
		},
		onResult({ result }) {
            console.log(result);
			if (result.type === 'failure') {
				selectedRace = undefined;
			}
		}
	});
	$: if ($message) {
		toastStore.trigger({ message: $message, background: "bg-warning-700" });
        $message = null;
	}
</script>

<div class="card variant-ghost h-80 w-full flex flex-col">
	<header class="card-header">
		<h4 class="h4">Race Selection</h4>
	</header>
	<section class="m-2 p-2 overflow-y-scroll h-full flex-grow grid grid-cols-3">
		{#each raceInfo as { image, name, color }}
			<form action="{$page.url.pathname}?/chooseRace" method="POST" use:enhance>
				<input type="hidden" name="race" value={name} />
				<button
					disabled={$disabledRaces.includes(name) && me.race !== name}
					style:border-color={(selectedRace === name && color) || undefined}
					class="h-fit m-1 p-1 border-2 rounded hover:border-slate-700 border-transparent disabled:grayscale disabled:border-transparent"
					class:border-dashed={!me?.ready}
					on:click={() => (selectedRace = name)}
				>
					{name}
					<img src={image} alt={name} class="w-full rounded" />
				</button>
			</form>
		{/each}
	</section>
</div>

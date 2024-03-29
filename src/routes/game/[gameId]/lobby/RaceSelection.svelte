<script lang="ts">
	import { page } from '$app/stores';
	import { sound } from '$lib/actions/sound';
	import { raceInfo, type RaceType } from '$lib/types/race';
	import { getGameContext } from '$lib/util/client/gameContext';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	const toastStore = getToastStore();
	const gameContext = getGameContext();
	const gameState = gameContext.gameState;

	$: me = $gameState.lobbyInfoMap[gameContext.me.id];
	$: selectedRaces = Object.values($gameState.lobbyInfoMap)
		.filter(({ ready }) => ready)
		.map(({ race }) => race);
	$: confirmedRaces = Object.entries($gameState.lobbyInfoMap)
		.filter(([_, { race, ready }]) => race && ready)
		.reduce(
			(obj, [playerId, { race }]) => ({ ...obj, [race!]: $gameState.usernameMap[playerId] }),
			{} as Record<RaceType, string>
		);

	let selectedRace: RaceType | undefined = $gameState.lobbyInfoMap[gameContext.me.id].race;

	const { enhance, message } = superForm(($page.data as PageData).chooseRaceSchema, {
		onSubmit({ formData, cancel }) {
			const formRace = formData.get('race')?.toString() as RaceType;
			if (formRace === selectedRace) cancel();
			else selectedRace = formRace;
		},
		onResult({ result }) {
			console.log(result);
			if (result.type === 'failure') {
				selectedRace = undefined;
			}
		}
	});
	$: if ($message) {
		toastStore.trigger({ message: $message });
		$message = null;
	}
</script>

<div class="sm:card w-full flex flex-col">
	<header class="card-header">
		<h4 class="h4">Race Selection</h4>
	</header>
	<section class="m-2 p-2 overflow-y-scroll h-full flex-grow grid grid-cols-2 md:grid-cols-3">
		{#each raceInfo as { image, name, color }}
			<form action="{$page.url.pathname}?/chooseRace" method="POST" use:enhance>
				<input type="hidden" name="race" value={name} />
				<button
					type="submit"
					disabled={(me.ready || selectedRaces.includes(name)) && me.race !== name}
					style:border-color={(selectedRace === name && color) || undefined}
					class="h-fit m-1 p-1 border-2 rounded hover:border-slate-700 border-transparent disabled:grayscale disabled:border-transparent relative"
					class:border-dashed={!me?.ready}
					class:pointer-events-none={me.ready}
					use:sound={{ src: '/sounds/buttonBeep.mp3', events: ['click'] }}
				>
					{name}
					<img src={image} alt={name} class="w-full rounded pointer-events-none" />
					{#if confirmedRaces[name]}
						<span class="absolute px-1 bottom-1 right-1 bg-surface-700">
							{confirmedRaces[name]}
						</span>
					{/if}
				</button>
				<span></span>
			</form>
		{/each}
	</section>
</div>

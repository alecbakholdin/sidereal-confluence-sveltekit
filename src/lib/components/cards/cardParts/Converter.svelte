<script lang="ts">
	import type { ColonyType } from '$lib/types/cards/colony';
	import type { EntityContainer } from '$lib/types/entityContainer';
	import { sortedResourceArrFromEntityContainer } from '$lib/types/resource';
	import { getGameState } from '$lib/util/client/gameContext';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import Resource from '../../Resource.svelte';
	import ColonyTypeIcon from './ColonyTypeIcon.svelte';

	const uuid = crypto.randomUUID();

	export let input: EntityContainer | EntityContainer[] | undefined = undefined;
	export let output: EntityContainer | undefined = undefined;
	export let phase: 'trade' | 'economy' = 'economy';
	export let upgrade: boolean = false;
	export let preventWrap: boolean = false;
	export let reservable: boolean = false;
	export let form: string | undefined = undefined;

	export let reserved: boolean | undefined = undefined;

	const dispatch = createEventDispatcher<{ toggle: boolean }>();
	const gameState = getGameState();

	$: inputArr = Array.isArray(input) ? input : input ? [input] : [];
	$: outputArr = sortedResourceArrFromEntityContainer(output);
	$: currentTurn = $gameState.turns[$gameState.turn];
	$: currentSharingBonus = currentTurn.sharingBonus;

	function colonyTypes(container: EntityContainer) {
		return (Object.entries(container.colonyTypes || {}) as [ColonyType, number][]).filter(
			([_, qty]) => qty
		);
	}
	function submitForm() {
		if (form) {
			const formEl = document.getElementById(form) as HTMLFormElement;
			formEl?.requestSubmit();
		}
	}
</script>

<label
	for="converter-{uuid}"
	class="flex gap-2 items-center p-2 rounded-sm"
	class:cursor-pointer={reservable}
	class:hover:variant-soft-surface={reservable}
>
	{#if reservable}
		<input
			id="converter-{uuid}"
			type="checkbox"
			class="checkbox"
			bind:checked={reserved}
			on:change={() => {
				dispatch('toggle', !!reserved);
				submitForm();
			}}
		/>
	{/if}
	<div class="flex items-center">
		<div class="flex items-center gap-1" class:flex-wrap={!preventWrap}>
			{#each inputArr as container, i}
				{#each sortedResourceArrFromEntityContainer(container) as { resource, quantity, donation }}
					<Resource {resource} {quantity} {donation} />
				{/each}
				{#each colonyTypes(container) as [colonyType, qty]}
					<ColonyTypeIcon {colonyType} planetClass={'text-4xl'} />
				{/each}
				{#if i < inputArr.length - 1}
					<span class="text-2xl"><strong>/</strong></span>
				{/if}
			{/each}
			{#if inputArr.length === 0}
				<Icon icon="material-symbols:crop-free" class="text-2xl text-gray-500" />
			{/if}
		</div>
		<div class:text-secondary-400={phase === 'trade'} class:text-white={phase === 'economy'}>
			<Icon icon="uil:arrow-right" class="text-2xl" />
		</div>
		<div class="flex items-center gap-1 flex-wrap w-fit">
			{#each outputArr as { resource, quantity, donation }}
				<Resource {resource} {quantity} {donation} />
			{/each}
			{#if upgrade}
				<Icon icon="grommet-icons:upgrade" class="text-secondary-400 text-2xl" />
			{:else if output?.sharingBonus}
				<Icon icon="mdi:add" />
				<Resource resource="point" quantity={currentSharingBonus} showZero />
			{:else if outputArr.length === 0}
				<Icon icon="material-symbols:crop-free" class="text-2xl" />
			{/if}
		</div>
	</div>
</label>

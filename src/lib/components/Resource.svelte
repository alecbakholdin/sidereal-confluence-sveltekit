<script lang="ts">
	import { largeResources, type LargeCubeType, type ResourceType } from '$lib/types/resource';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	export let resource: ResourceType;
	export let quantity: number | undefined = undefined;
	export let editable: boolean = false;
	export let donation: boolean = false;

	$: large = largeResources.includes(resource as LargeCubeType);
	$: small = !large;

	const dispatch = createEventDispatcher<{ change: number }>();

	let editInProgress: boolean;
	let timeout: NodeJS.Timeout | undefined;
	function handleMouseDown() {
		if (editable)
			timeout = setTimeout(() => {
				editInProgress = true;
				timeout = undefined;
			}, 400);
	}
	function handleMouseUp() {
		if (timeout) clearTimeout(timeout);
	}
	let editInput: HTMLInputElement;
	$: if (editInput) {
		editInput.focus();
		editInput.type = 'text';
		editInput.setSelectionRange(0, editInput.value.length);
		editInput.type = 'number';
	}
</script>

<div
	class="relative w-fit grid place-items-center {resource}"
	class:donation
	class:large
	class:small
>
	<div class="icon">
		{#if resource === 'hexagon'}
			<Icon icon="ic:baseline-hexagon" />
		{:else if resource === 'ship'}
			<Icon icon="game-icons:spaceship" />
		{:else if resource === 'point'}
			<Icon icon="solar:star-circle-bold-duotone" />
		{:else}
			<Icon icon="bi:diamond-fill" />
		{/if}
	</div>
	{#if editInProgress}
		<input
			type="number"
			inputmode="numeric"
			autocomplete="off"
			style:background="none"
			class="bg-transparent border-none quantity w-16 text-center p-0"
			class:large
			class:small
			name="quantity"
			bind:value={quantity}
			on:input={() => dispatch('change', quantity || 0)}
			on:blur={() => (editInProgress = false)}
			bind:this={editInput}
		/>
	{:else}
		<button
			class="absolute w-full h-full"
			type="button"
			on:mousedown={handleMouseDown}
			on:touchstart={handleMouseDown}
			on:mouseup={handleMouseUp}
			on:touchend={handleMouseUp}
			on:click
			tabindex={editable ? 0 : -1}
			class:pointer-events-none={!editable}
		>
			<span class="font-mono quantity">
				{quantity || ''}
			</span>
		</button>
	{/if}
</div>

<style lang="postcss">
	/* special formatting */
	.quantity {
		@apply absolute top-1/2 left-1/2 text-2xl;
		transform: translateX(-50%) translateY(-50%);
	}

	.donation {
		fill: none;
		stroke: var(--donation-color);
		stroke-width: 1.5px;
		stroke-linejoin: round;
	}

	/* text formatting */
	.large {
		@apply text-5xl;
	}
	.large input {
		@apply text-4xl;
	}
	.small {
		@apply text-3xl;
	}
	.small input {
		@apply text-2xl;
	}

	.green span,
	.brown span,
	.blue span,
	.black span,
	.unitySmall span,
	.unityLarge span {
		@apply text-white;
	}
	.white span,
	.yellow span,
	.hexagon span {
		@apply text-black;
	}

	/* icon coloring */
	.green .icon {
		@apply text-green-600;
	}
	.brown .icon {
		@apply text-amber-900;
	}
	.white .icon {
		@apply text-white;
	}
	.blue .icon {
		@apply text-blue-600;
	}
	.yellow .icon {
		@apply text-yellow-400;
	}
	.black .icon {
		@apply text-black;
	}
	.unitySmall .icon,
	.unityLarge .icon {
		@apply text-gray-600;
	}
	.hexagon .icon {
		@apply text-amber-400;
	}
	.point .icon {
		@apply text-secondary-500;
	}
	.ship .icon {
		@apply text-red-600
	}

	/* remove up and down arrows */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>

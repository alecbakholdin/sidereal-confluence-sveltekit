<script lang="ts">
	import { largeResources, type LargeResourceType, type ResourceType } from '$lib/types/resource';
	import { createEventDispatcher } from 'svelte';

	export let resource: ResourceType;
	export let quantity: number | undefined = undefined;
	export let editable: boolean = false;
	export let donation: boolean = false;

	$: large = largeResources.includes(resource as LargeResourceType);
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

<div class="relative w-fit grid place-items-center {resource}" class:donation>
	{#if resource === 'hexagon'}
		<iconify-icon icon="ic:baseline-hexagon" class="large" />
	{:else}
		<iconify-icon icon="bi:diamond-fill" class:large class:small />
	{/if}
	{#if editInProgress}
		<input
			type="number"
			inputmode="numeric"
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
			class:pointer-events-none={!editable}
		>
			<span class="font-mono quantity">
				{quantity || ''}
			</span>
		</button>
	{/if}
</div>

<style lang="postcss">
	.quantity {
		@apply absolute top-1/2 left-1/2 text-2xl;
		transform: translateX(-50%) translateY(-50%);
	}

	.large {
		@apply text-4xl;
	}
	.small {
		@apply text-2xl;
	}

	/* small cubes */
	.green iconify-icon {
		@apply text-green-600;
	}
	.brown iconify-icon {
		@apply text-amber-900;
	}
	.white iconify-icon {
		@apply text-white;
	}
	.white span {
		@apply text-black;
	}

	/* large cubes */
	.blue iconify-icon {
		@apply text-blue-600;
	}
	.yellow iconify-icon {
		@apply text-yellow-400;
	}
	.yellow span {
		@apply text-black;
	}
	.black iconify-icon {
		@apply text-black;
	}

	/* special */
	.unitySmall iconify-icon,
	.unityLarge iconify-icon {
		@apply text-gray-600;
	}
	.unitySmall span,
	.unityLarge span {
		@apply text-white;
	}
	.hexagon iconify-icon {
		@apply text-amber-400;
	}
	.hexagon span {
		@apply text-black;
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

	.donation iconify-icon {	
		fill: none;
		stroke: var(--donation-color);
		stroke-width: 1px;
		stroke-dasharray: 2,1;
		stroke-linejoin: round;
	}
</style>

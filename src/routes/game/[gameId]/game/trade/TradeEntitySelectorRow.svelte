<script lang="ts">
	import Resource from '$lib/components/Resource.svelte';
	import type { ResourceType } from '$lib/types/resource';
	import { createEventDispatcher } from 'svelte';

	export let resource: ResourceType;
	export let quantity: number | undefined = undefined;
	export let active: boolean = false;

	const dispatch = createEventDispatcher<{ toggle: void; change: number }>();
	let timeout: NodeJS.Timeout;
	let editable: boolean = false;
	let editInput: HTMLInputElement;
	$: if (editInput) {
		editInput.focus();
		editInput.type = 'text';
		editInput.setSelectionRange(0, editInput.value.length);
		editInput.type = 'numeric';
	}

	function handleMouseDown() {
		if (!active) return;
		timeout = setTimeout(() => (editable = true), 500);
	}
	function handleMouseUp() {
		if (timeout) {
			clearTimeout(timeout);
		}
	}
</script>

<div class="flex flex-nowrap rounded-3xl py-1" class:bg-surface-700={active}>
	<button
		class="btn-icon btn-icon-sm"
		class:pointer-events-none={!active}
		on:click={() => dispatch('change', Math.max(0, (quantity = quantity || 0) - 1))}
	>
		<iconify-icon icon="material-symbols:chevron-left" />
	</button>
	<div class="w-8 relative flex justify-center">
		{#if editable}
			<input
				type="number"
				inputmode="numeric"
				style:background="none"
				class="input border-none absolute z-10 w-10 place-self-center text-center"
				bind:value={quantity}
				on:blur={() => {
					dispatch('change', Math.max(0, quantity || 0));
					editable = false;
				}}
				bind:this={editInput}
			/>
		{/if}
		<button
			on:click={() => dispatch('toggle')}
			on:mousedown={handleMouseDown}
			on:mouseup={handleMouseUp}
			on:touchstart={handleMouseDown}
			on:touchend={handleMouseUp}
		>
			<Resource {resource} quantity={editable || quantity === 0 ? undefined : quantity} />
		</button>
	</div>
	<button
		class="btn-icon btn-icon-sm"
		class:pointer-events-none={!active}
		on:click={() => dispatch('change', (quantity = quantity || 0) + 1)}
	>
		<iconify-icon icon="material-symbols:chevron-right" />
	</button>
</div>

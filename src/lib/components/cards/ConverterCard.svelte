<script lang="ts">
	import Resource from '$lib/components/Resource.svelte';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import Converter from './Converter.svelte';

	export let open: boolean = false;
	const dispatch = createEventDispatcher<{ toggle: boolean }>();
</script>

<button class="card variant-outline p-2" on:click={() => dispatch('toggle', (open = true))}>
	<div class="flex items-center gap-2 transition-transform">
		<input type="checkbox" name="reserved" class="checkbox" on:click|stopPropagation={() => {}} />
		<div class="flex flex-col items-center w-fit">
			{#if open}
				<button
					type="button"
					class="btn"
					on:click|stopPropagation={() => dispatch('toggle', (open = false))}
					transition:slide
				>
					close
				</button>
			{/if}
			<Converter
				input={{ resource: { black: 3 } }}
				output={{ resource: { white: 2 }, donations: { blue: 3 } }}
			/>
			{#if open}
				<div transition:slide>
					<div class="w-64 flex justify-between" transition:slide={{ axis: 'x' }}>
						<div>
							<Icon icon="uil:arrow-up" class="text-lg" />
						</div>
						<div>
							<Icon icon="uil:arrow-up" class="text-lg" />
						</div>
						<div>
							<Icon icon="uil:arrow-up" class="text-lg" />
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</button>

<style>
</style>

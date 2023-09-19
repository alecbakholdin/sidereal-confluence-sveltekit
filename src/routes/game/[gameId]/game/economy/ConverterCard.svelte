<script lang="ts">
	import Resource from '$lib/components/Resource.svelte';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	export let open: boolean = false;
	const dispatch = createEventDispatcher<{ toggle: boolean }>();
</script>

<button class="card variant-outline p-2" on:click={() => dispatch('toggle', (open = true))}>
	<div class="flex items-center gap-2 transition-transform">
		<input type="checkbox" name="reserved" class="checkbox" on:click|stopPropagation={() => {}} />
		<div class="flex flex-col items-center w-fit">
			{#if open}
				<button class="btn" on:click|stopPropagation={() => dispatch('toggle', (open = false))} transition:slide>
					close
				</button>
			{/if}
			<div class="flex gap-1 items-center">
				<Resource resource="black" quantity={3} />
				<Icon icon="uil:arrow-right" class="text-2xl" />
				<Resource resource="yellow" quantity={3} />
				<Resource resource="blue" quantity={3} donation />
				<Resource resource="brown" quantity={3} donation />
			</div>
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

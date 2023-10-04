<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createCollapsible, melt } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	export let flipped = false;
	export let expanded = false;
	export let disableExpansion = false;
	export let orientation: 'vertical' | 'horizontal' = 'vertical';
	export let disableFlip = false;

	interface $$Slots {
		title: {};
		frontTop: {};
		frontCenter: {};
		frontBottom: {};
		backTop: {};
		backCenter: {};
		backBottom: {};
	}

	const dispatch = createEventDispatcher<{ toggleExpanded: boolean }>();

	const {
		elements: { root, content, trigger },
		states: { open }
	} = createCollapsible({
		onOpenChange: ({ next }) => {
			dispatch('toggleExpanded', next);
			return next;
		}
	});

	let frontTriggerHeight: number;
	let frontTriggerWidth: number;
	let backTriggerHeight: number;
	let backTriggerWidth: number;
	$: triggerHeight = flipped ? backTriggerHeight : frontTriggerHeight;
	$: triggerWidth = flipped ? backTriggerWidth : frontTriggerWidth;
	$: unexpandedHeight = triggerHeight + 'px';
	$: unexpandedWidth = triggerWidth + 'px';
	$: expandedHeight = orientation === 'vertical' ? '20rem' : `${20 / 1.4}rem`;
	$: expandedWidth = orientation === 'horizontal' ? '20rem' : `${20 / 1.4}rem`;
	$: $open = expanded;
</script>

<div class="card p-2 w-fit">
	<div
		use:melt={$root}
		class="rotating-card relative flex flex-col items-center transition-all transform w-fit h-fit"
		style:width={$open ? expandedWidth : unexpandedWidth}
		style:height={$open ? expandedHeight : unexpandedHeight}
		style:transform-style="preserve-3d"
		class:flipped
	>
		<div class="card-side" class:absolute={flipped}>
			{#if $open}
				<div
					use:melt={$content}
					class="flex flex-grow flex-col"
					transition:slide={{ duration: 50 }}
				>
					{#if !disableExpansion}
						<button use:melt={$trigger} class="btn-icon btn-icon-sm absolute top-0 left-0">
							<Icon icon="bx:collapse-alt" class="text-xl" />
						</button>
					{/if}

					<button
						type="button"
						class="btn-icon btn-icon-sm absolute top-0 right-0"
						class:hidden={disableFlip}
						on:click|stopPropagation={() => (flipped = !flipped)}
					>
						<Icon icon="solar:refresh-bold" class="text-xl" />
					</button>

					<slot name="title" />
					<slot name="frontTop" />
				</div>
			{/if}

			<div
				class="flex gap-2 items-center"
				bind:clientHeight={frontTriggerHeight}
				bind:clientWidth={frontTriggerWidth}
			>
				<slot name="frontCenter" />
				{#if !$open && !disableExpansion}
					<button
						use:melt={$trigger}
						class="btn-icon btn-icon-sm"
						transition:slide={{ axis: 'x', duration: 50 }}
					>
						<Icon icon="bx:expand-alt" class="text-xl" />
					</button>
				{/if}
			</div>

			{#if $open}
				<div class="flex-grow w-full" use:melt={$content} transition:slide={{ duration: 50 }}>
					<slot name="frontBottom" />
				</div>
			{/if}
		</div>
		<div class="card-side top-0 left-0" style:transform="rotateY(180deg)" class:absolute={!flipped}>
			{#if $open}
				<div
					use:melt={$content}
					class="flex flex-col flex-grow"
					transition:slide={{ duration: 50 }}
				>
					{#if !disableExpansion}
						<button use:melt={$trigger} class="btn-icon btn-icon-sm absolute top-0 left-0">
							<Icon icon="bx:collapse-alt" class="text-xl" />
						</button>
					{/if}
					<button
						type="button"
						class="btn-icon btn-icon-sm absolute top-0 right-0"
						class:hidden={disableFlip}
						on:click|stopPropagation={() => (flipped = !flipped)}
					>
						<Icon icon="solar:refresh-bold" class="text-xl" />
					</button>
					<slot name="title" />
					<slot name="backTop" />
				</div>
			{/if}
			<div
				class="flex gap-2 items-center"
				bind:clientHeight={backTriggerHeight}
				bind:clientWidth={backTriggerWidth}
			>
				<slot name="backCenter" />
				{#if !$open && !disableExpansion}
					<button
						use:melt={$trigger}
						class="btn-icon btn-icon-sm"
						transition:slide={{ axis: 'x', duration: 50 }}
					>
						<Icon icon="bx:expand-alt" class="text-xl" />
					</button>
				{/if}
			</div>
			{#if $open}
				<div class="flex-grow w-full" use:melt={$content} transition:slide={{ duration: 50 }}>
					<slot name="backBottom" />
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.rotating-card {
		transform-style: preserve-3d;
	}
	.flipped {
		transform: rotateY(180deg);
	}
	.card-side {
		backface-visibility: hidden;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;

		height: 100%;
		width: 100%;
	}
</style>

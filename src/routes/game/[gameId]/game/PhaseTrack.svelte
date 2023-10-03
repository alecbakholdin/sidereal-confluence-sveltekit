<script lang="ts">
	import Icon from '@iconify/svelte';
	import PhaseTrackPhase from './PhaseTrackPhase.svelte';

	export let phaseNames: any[];
	export let activePhase: number;

	$: formattedPhases =
		phaseNames?.map((p) =>
			String(p)
				.split(' ')
				.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		) || [];

	let container: HTMLDivElement;
	$: baseOffset = container?.getBoundingClientRect().x || 0;
	let rects: HTMLSpanElement[] = Array(phaseNames?.length || 0);
</script>

<div class="relative flex items-center gap-1" bind:this={container}>
	{#each formattedPhases as phase, i}
		<span class="z-10" bind:this={rects[i]}>
			<PhaseTrackPhase>
				<svelte:fragment slot="tooltip">
					<slot name="tooltip" {i}/>
				</svelte:fragment>
				{phase}
			</PhaseTrackPhase>
		</span>
		{#if i < phaseNames.length - 1}
			<Icon icon="material-symbols:chevron-right" class="w-4 z-10" />
		{/if}
	{/each}
	<div
		class="absolute rounded-full h-full transition-all bg-purple-400"
		style:width="{rects[activePhase]?.clientWidth + 10}px"
		style:transform="translateX({rects[activePhase]?.getBoundingClientRect().left -
			baseOffset -
			5}px)"
	></div>
</div>

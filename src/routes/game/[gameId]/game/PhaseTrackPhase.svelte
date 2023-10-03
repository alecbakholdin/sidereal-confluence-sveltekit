<script lang="ts">
	import { createTooltip, melt } from '@melt-ui/svelte';

	const {
		elements: { content, trigger, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: 'bottom'
		},
		openDelay: 0,
		closeDelay: 0
	});
</script>

<span use:melt={$trigger} class:pointer-cursor={$$slots.tooltip}>
	<slot />
</span>
{#if $open}
	<div use:melt={$content} class="z-20">
		<slot name="tooltip" />
		<div use:melt={$arrow} />
	</div>
{/if}

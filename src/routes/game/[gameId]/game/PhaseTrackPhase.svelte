<script lang="ts">
	import { createTooltip, melt } from '@melt-ui/svelte';

	const {
		elements: { content, trigger, arrow },
		states: { open },
	} = createTooltip({
		positioning: {
			placement: 'bottom'
		},
		closeOnPointerDown: false,
		forceVisible: true,
		openDelay: 0,
		closeDelay: 0
	});
</script>

<button use:melt={$trigger} class:pointer-cursor={$$slots.tooltip} disabled={!$$slots.tooltip}>
	<slot />
</button>
{#if $open}
	<div use:melt={$content} class="z-20">
		<slot name="tooltip" />
		<div use:melt={$arrow} />
	</div>
{/if}

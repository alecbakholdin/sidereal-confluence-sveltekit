<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	export let era: number;

	const {
		elements: { content, trigger },
		states: { open }
	} = createTooltip({
		openDelay: 0,
		closeDelay: 0,
        closeOnPointerDown: false
	});
</script>

<div class="text-3xl rounded-full border" use:melt={$trigger}>
	<Icon icon="mdi:roman-numeral-{era}" />
</div>
{#if $open}
	<div class="z-20 card px-4 py-2" in:fade={{ duration: 30 }} use:melt={$content}>Era</div>
{/if}

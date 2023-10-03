<script lang="ts">
	import type { ColonyType } from '$lib/types/cards/colony';
	import Icon from '@iconify/svelte';
	import type { CssClasses } from '@skeletonlabs/skeleton';

	export let planetClass: CssClasses = 'text-7xl';
	export let colonyType: ColonyType | undefined;
</script>

<div
	class:text-white={colonyType === 'Ice'}
	class:text-green-400={colonyType === 'Jungle'}
	class:text-blue-500={colonyType === 'Ocean'}
	class:text-red-400={colonyType === 'Desert'}
>
	<Icon icon="pepicons-print:planet" class={planetClass} />
</div>

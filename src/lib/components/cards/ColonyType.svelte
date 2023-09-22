<script lang="ts">
	import type { ColonyType } from '$lib/types/cards/colony';
	import Icon from '@iconify/svelte';
	import type { CssClasses } from '@skeletonlabs/skeleton';

	export let planetClass: CssClasses = 'text-7xl';
	export let colonyType: ColonyType | undefined;
</script>

<div
	class:text-white={colonyType === 'white'}
	class:text-green-400={colonyType === 'green'}
	class:text-blue-500={colonyType === 'blue'}
	class:text-red-400={colonyType === 'red'}
>
	<Icon icon="pepicons-print:planet" class={planetClass} />
</div>

<script lang="ts">
	import type { ColonyType } from '$lib/types/cards/colony';
	import Icon from '@iconify/svelte';

	export let colonyType: ColonyType | undefined;
</script>

<div
	class:text-white={colonyType === 'white'}
	class:text-green-400={colonyType === 'green'}
	class:text-blue-500={colonyType === 'blue'}
	class:text-red-400={colonyType === 'red'}
>
	<Icon icon="pepicons-print:planet" class="text-7xl text-inherit" />
</div>

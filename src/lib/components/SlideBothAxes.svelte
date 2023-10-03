<script>
	import { slide } from 'svelte/transition';
</script>

<div transition:slide={{ axis: 'x' }}>
	<div transition:slide={{ axis: 'y' }}>
		<slot />
	</div>
</div>

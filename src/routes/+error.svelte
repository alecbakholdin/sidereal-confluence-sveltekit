<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="w-full h-full grid place-items-center">
	<div class="grid grid-cols-1 place-items-center gap-2">
		<span>{$page.error?.message}</span>
		<a href="/" class="btn variant-ghost-primary">Back to Main Menu</a>
	</div>
</div>

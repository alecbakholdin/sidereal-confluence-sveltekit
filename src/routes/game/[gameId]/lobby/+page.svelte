<script>
	import { page } from '$app/stores';
</script>

<button
	class="btn variant-filled-primary"
	type="button"
	on:click={() => {
		fetch($page.url.pathname, { method: 'POST' });
	}}
>
	click me
</button>

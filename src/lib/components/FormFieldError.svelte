<script lang="ts">
	export let errors: any;
</script>

{#if errors}
	<span class="text-warning-400">
		{Array.isArray(errors)
			? errors.join(',')
			: typeof errors === 'object'
			? Object.values(errors).join(', ')
			: errors.toString()}
	</span>
{/if}

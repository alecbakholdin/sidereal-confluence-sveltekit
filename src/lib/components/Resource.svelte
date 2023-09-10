<script lang="ts">
	import { largeResources, type LargeResourceType, type ResourceType } from '$lib/types/resource';

	export let resource: ResourceType;
	export let quantity: number | undefined = undefined;

	$: large = (largeResources).includes(resource as LargeResourceType);
	$: small = !large
</script>

<div class="relative w-fit grid place-items-center">
	{#if resource === 'hexagon'}
		<iconify-icon icon="ic:baseline-hexagon" class="{resource} large" />
	{:else}
		<iconify-icon icon="ion:cube" class={resource} class:large class:small/>
	{/if}
	{#if quantity !== undefined}
		<span class="font-mono quantity">
			{quantity}
		</span>
	{/if}
</div>

<style lang="postcss">
	.quantity {
		@apply absolute top-1/2 left-1/2 text-2xl;
		transform: translateX(-50%) translateY(-50%);
		font-weight: 900;
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: rgb(var(--color-primary-800));
	}

	.large {
		@apply text-4xl
	}
	.small {
		@apply text-3xl
	}

	/* small cubes */
	.green {
		@apply text-green-400
	}
	.brown {
		@apply text-amber-900
	}
	.white {
		@apply text-white
	}

	/* large cubes */
	.blue {
		@apply text-blue-400
	}
	.yellow {
		@apply text-yellow-400
	}
	.black {
		@apply text-black
	}

	/* special */
	.unitySmall,.unityLarge {
		@apply text-gray-400
	}
	.hexagon {
		@apply text-amber-400
	}

</style>

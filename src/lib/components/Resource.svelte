<script lang="ts">
	import { largeResources, type LargeResourceType, type ResourceType } from '$lib/types/resource';

	export let resource: ResourceType;
	export let quantity: number | undefined = undefined;
	export let questionMark: boolean = false;

	$: large = largeResources.includes(resource as LargeResourceType);
	$: small = !large;
</script>

<div class="relative w-fit grid place-items-center {resource}">
	{#if resource === 'hexagon'}
		<iconify-icon icon="ic:baseline-hexagon" class="large" />
	{:else}
		<iconify-icon icon="bi:diamond-fill" class:large class:small />
	{/if}
	{#if questionMark}
		<span class="font-mono quantity">?</span>
	{:else if quantity !== undefined}
		<span class="font-mono quantity">
			{quantity}
		</span>
	{/if}
</div>

<style lang="postcss">
	.quantity {
		@apply absolute top-1/2 left-1/2 text-2xl;
		transform: translateX(-50%) translateY(-50%);
	}

	.large {
		@apply text-4xl;
	}
	.small {
		@apply text-2xl;
	}

	/* small cubes */
	.green iconify-icon {
		@apply text-green-600;
	}
	.brown iconify-icon {
		@apply text-amber-900;
	}
	.white iconify-icon {
		@apply text-white;
	}
	.white span {
		@apply text-black;
	}

	/* large cubes */
	.blue iconify-icon {
		@apply text-blue-600;
	}
	.yellow iconify-icon {
		@apply text-yellow-400;
	}
	.yellow span {
		@apply text-black;
	}
	.black iconify-icon {
		@apply text-black;
	}

	/* special */
	.unitySmall iconify-icon,
	.unityLarge iconify-icon {
		@apply text-gray-400;
	}
	.unitySmall span,
	.unityLarge span {
		@apply text-black;
	}
	.hexagon iconify-icon {
		@apply text-amber-400;
	}
	.hexagon span {
		@apply text-black;
	}
</style>

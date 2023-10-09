<script lang="ts">
	import { page } from '$app/stores';
	import { loadingButton } from '$lib/actions/loadingButton';
	import { initEmptyForm } from '$lib/actions/toastOnError';
	import Resource from '$lib/components/Resource.svelte';
	import {
		getDonationArr,
		getResourceArr,
		invertEntityContainer,
		mergeEntityContainers,
		playerResourcesAsEntityContainer
	} from '$lib/types/entityContainer';
	import { toSortedResourceArr, type ResourceAmount } from '$lib/types/resource';
	import { getReservedConverters } from '$lib/util/client/cardWrapper';
	import { getMyPlayerInfo, getPhase } from '$lib/util/client/gameContext';
	import Icon from '@iconify/svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { derived } from 'svelte/store';

	const phase = getPhase();
	const myPlayerInfo = getMyPlayerInfo();
	const reservedConverters = derived(myPlayerInfo, getReservedConverters);
	$: playerResources = playerResourcesAsEntityContainer($myPlayerInfo);

	const myResources = derived(myPlayerInfo, (info) => info.resources);

	$: input = mergeEntityContainers(...$reservedConverters.map((x) => x.input));
	$: output = mergeEntityContainers(...$reservedConverters.map((x) => x.output));
	$: endResult = mergeEntityContainers(invertEntityContainer(input), output, playerResources);
	$: endResultResourceAmountArr = [
		...getDonationArr(endResult).map(
			([r, q]) => ({ resource: r, quantity: q, donation: true }) as ResourceAmount
		),
		...getResourceArr(endResult).map(([r, q]) => ({ resource: r, quantity: q }) as ResourceAmount)
	];
	$: endResultSorted = toSortedResourceArr(endResultResourceAmountArr);

	$: sections = [
		{
			resources: getResourceArr(input),
			donations: getDonationArr(input),
			title: 'Input',
			showErrorOnMissing: true
		},
		{
			resources: getResourceArr(output),
			donations: getDonationArr(output),
			title: 'Output'
		}
	];

	const toastStore = getToastStore();
	const { enhance, loading } = initEmptyForm(toastStore);
</script>

<div class="card w-full grid place-items-center">
	<header class="card-header">
		<h4 class="h4">Economy Outcome Preview</h4>
	</header>
	<div class="p-4 grid grid-cols gap-3">
		<div class="w-full flex items-center justify-center">
			{#each sections as { resources, donations, title, showErrorOnMissing }, i}
				{@const isFirstSection = i === 0}
				<div class="info-section">
					<header class="card-header">
						<h5 class="h5">{title}</h5>
					</header>
					<div
						class="p-4 flex-grow min-h-[100px] flex flex-wrap items-center gap-1"
						class:justify-end={isFirstSection}
					>
						{#each resources as [r, qty]}
							{@const showError =
								showErrorOnMissing &&
								qty > ($myResources.find((x) => x.resource === r && !x.donation)?.quantity || 0)}
							<div
								class="relative border rounded-sm"
								class:border-transparent={!showError}
								class:border-error-400={showError}
							>
								<Resource resource={r} quantity={qty} />
								{#if showError}
									<Icon
										icon="material-symbols:error"
										class="absolute text-xs text-error-400 bottom-0 right-0 "
									/>
								{/if}
							</div>
						{/each}
						{#each donations as [r, qty]}
							<Resource resource={r} quantity={qty} />
						{/each}
					</div>
				</div>
				{#if isFirstSection}
					<Icon icon="uil:arrow-right" class="text-4xl" />
				{/if}
			{/each}
		</div>
		<div class="info-section">
			<header class="card-header"><h5 class="h5">Expected Outcome</h5></header>
			<div class="p-4 flex w-full flex-wrap items-center gap-1">
				{#each endResultSorted as { resource, quantity, donation }}
					{#if quantity}
						<div
							class="relative border rounded-sm"
							class:border-transparent={quantity >= 0}
							class:border-error-400={quantity < 0}
						>
							<Resource {resource} {quantity} {donation} />
							{#if quantity < 0}
								<Icon
									icon="material-symbols:error"
									class="absolute text-xs text-error-400 bottom-0 right-0"
								/>
							{/if}
						</div>
					{/if}
				{/each}
			</div>
		</div>

		{#if $phase === 'economy'}
			<form action="{$page.url.pathname}?/resolveEconomy" method="post" use:enhance>
				<button
					class="btn variant-ghost-secondary w-full"
					disabled={$myPlayerInfo.ready}
					use:loadingButton={{ loading }}
				>
					Resolve Economy Phase
				</button>
			</form>
		{/if}
	</div>
</div>

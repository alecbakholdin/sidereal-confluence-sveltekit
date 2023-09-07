<script>
	import { settings } from '$lib/util/settingsStore';
	import { RangeSlider, getModalStore } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';

	const modalStore = getModalStore();
	const initialSettings = writable($settings);

	function submitChanges() {
		$settings = $initialSettings;
		closeModal();
	}

	function closeModal() {
		modalStore.close();
	}
</script>

<div class="card max-w-xl w-full h-full">
	<header class="card-header grid grid-cols-[1fr_auto]">
		<h4 class="h4"><strong>Settings</strong></h4>
		<button type="button" class="btn-icon btn-icon-lg bg-surface-hover-token" on:click={closeModal}>
			<iconify-icon icon="mdi:remove" />
		</button>
	</header>
	<section class="p-4 px-8">
		<div>
			<label for="volume" class="label">Volume</label>
			<div class="w-full grid grid-cols-[1fr_auto] place-items-center [&>div]:w-full space-x-4">
				<RangeSlider
					name="volume"
					bind:value={$initialSettings.volume}
					min={0}
					max={1}
					step={0.01}
				/>
				<span class="text-2xl align-middle">{Math.round($initialSettings.volume * 100)}</span>
			</div>
		</div>
		<button type="button" class="btn" />
	</section>
</div>

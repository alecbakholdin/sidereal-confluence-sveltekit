<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_PUSHER_CLUSTER, PUBLIC_PUSHER_KEY } from '$env/static/public';
	import type { GameState } from '$lib/types/game';
	import { UPDATE_EVENT, presenceChannel } from '$lib/util/pusherChannels';
	import { applyChangeset, type Changeset } from 'json-diff-ts';
	import Pusher, { Members, PresenceChannel } from 'pusher-js';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { LayoutData } from './$types';
	import type { User } from '$lib/types/user';
	import type { PresenceChannelData } from 'pusher';

	const gameState = writable<GameState>(($page.data as LayoutData).gameState);
	const onlineMembers = writable<User[]>([]);
	type MemberInfo = {
		id: string;
		info: User;
	};
	function joinGame(gameId: string) {
		const pusher = new Pusher(PUBLIC_PUSHER_KEY, {
			cluster: PUBLIC_PUSHER_CLUSTER,
			authEndpoint: `/game/${gameId}/auth`
		});
		const gameChannel = pusher.subscribe(presenceChannel(gameId)) as PresenceChannel;
		gameChannel.bind(UPDATE_EVENT, (data: Changeset) => {
			gameState.update((obj) => applyChangeset(obj, data));
		});
		gameChannel.bind('pusher:subscription_succeeded', (members: Members) => {
			onlineMembers.update((arr) => {
				members.each(({ info }: MemberInfo) => arr.push(info));
				return arr;
			});
		});
		gameChannel.bind(
			'pusher:member_added',
			({ info }: MemberInfo) => ($onlineMembers = [...$onlineMembers, info])
		);
		gameChannel.bind(
			'pusher:member_removed',
			({ id }: MemberInfo) => ($onlineMembers = $onlineMembers.filter((member) => member.id !== id))
		);
	}

	onMount(() => {
		joinGame($page.params.gameId);
	});
</script>

<div class="w-full h-full grid place-items-center">
	{JSON.stringify($gameState)}
	{JSON.stringify($onlineMembers)}
	<slot />
</div>

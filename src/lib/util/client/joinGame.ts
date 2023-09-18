import { PUBLIC_PUSHER_KEY, PUBLIC_PUSHER_CLUSTER } from '$env/static/public';
import type { User } from '$lib/types/user';
import { type Changeset, applyChangeset } from 'json-diff-ts';
import Pusher, { type PresenceChannel, type Members } from 'pusher-js';
import type { Writable } from 'svelte/store';
import {
	directChannel,
	presenceChannel,
	TOAST_EVENT,
	TRADE_PROPOSAL_EVENT,
	UPDATE_EVENT
} from '../pusherChannels';
import type { GameState } from '$lib/types/game';
import type PrivateChannel from 'pusher-js/types/src/core/channels/private_channel';
import type { ModalStore, ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
import type { TradeProposal } from '$lib/types/trade';
import ReviewTradeProposalModalComponent from '../../../routes/game/[gameId]/game/ReviewTradeProposalModalComponent.svelte';

type MemberInfo = {
	id: string;
	info: User;
};
export function joinGame(
	gameState: Writable<GameState>,
	onlineMembers: Writable<User[]>,
	gameId: string,
	userId: string,
	toastStore: ToastStore,
	modalStore: ModalStore,
	getUsername: (playerId: string) => string
) {
	const pusher = new Pusher(PUBLIC_PUSHER_KEY, {
		cluster: PUBLIC_PUSHER_CLUSTER,
		authEndpoint: `/game/${gameId}/auth`,
		userAuthentication: {
			transport: 'ajax',
			endpoint: `/game/${gameId}/auth/user`
		}
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
	gameChannel.bind('pusher:member_added', ({ info }: MemberInfo) =>
		onlineMembers.update((arr) => [...arr, info])
	);
	gameChannel.bind('pusher:member_removed', ({ id }: MemberInfo) =>
		onlineMembers.update((arr) => arr.filter((member) => member.id !== id))
	);
	/* gameChannel.bind(TRADE_PROPOSAL_EVENT, (data: TradeProposal) => console.log(data)) */

	pusher.user.signin();
	pusher.user.bind(TOAST_EVENT, (data: ToastSettings) => toastStore.trigger(data));
	pusher.user.bind(TRADE_PROPOSAL_EVENT, (data: TradeProposal) => {
		console.log(data);
		toastStore.trigger({
			message: `You've been invited to trade by ${getUsername(data.srcPlayerId)}`,
			autohide: false,
			action: {
				label: 'Review',
				response: () =>
					modalStore.trigger({
						type: 'component',
						component: {
							ref: ReviewTradeProposalModalComponent,
							props: {
								tradeProposal: data,
								gameState
							}
						}
					})
			}
		});
	});
}

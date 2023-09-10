import { PUBLIC_PUSHER_KEY, PUBLIC_PUSHER_CLUSTER } from "$env/static/public";
import type { User } from "$lib/types/user";
import { type Changeset, applyChangeset } from "json-diff-ts";
import Pusher, { type PresenceChannel, type Members } from "pusher-js";
import type { Writable } from "svelte/store";
import { presenceChannel, UPDATE_EVENT } from "../pusherChannels";
import type { GameState } from "$lib/types/game";

type MemberInfo = {
    id: string;
    info: User;
};
export function joinGame(gameState: Writable<GameState>, onlineMembers: Writable<User[]>, gameId: string) {
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
        ({ info }: MemberInfo) => (onlineMembers.update(arr => [...arr, info]))
    );
    gameChannel.bind(
        'pusher:member_removed',
        ({ id }: MemberInfo) => (onlineMembers.update(arr => arr.filter((member) => member.id !== id)))
    );
}
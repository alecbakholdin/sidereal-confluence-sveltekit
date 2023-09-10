import type { RaceType } from "./race";
import type { User, UserId } from "./user";

export type GameState = {
    id: string;
    adminId: string;
	state: 'lobby' | 'inProgress';
    players: UserId[];
    usernameMap: Record<UserId, string>;
    lobbyInfoMap: Record<UserId, LobbyPlayerInfo>; 
};

export type LobbyPlayerInfo = {
    ready?: boolean;
    race?: RaceType;
}

export function getDefaultGameState(id: string, adminId: UserId): GameState {
    return {
        id,
        adminId: adminId,
        state: 'lobby',
        players: [],
        usernameMap: {},
        lobbyInfoMap: {},
    }
}
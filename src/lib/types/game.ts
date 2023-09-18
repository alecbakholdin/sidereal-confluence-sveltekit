import type { RaceType } from './race';
import type { ResourceAmount } from './resource';
import type { EntityContainer, TradeInfo, TradePreferences } from './trade';
import type { User, UserId } from './user';

export type GameState = {
	id: string;
	adminId: string;
	state: 'lobby' | 'inProgress';
	players: UserId[];
	usernameMap: Record<UserId, string>;
	lobbyInfoMap: Record<UserId, LobbyPlayerInfo>;
	gameInfo: Record<UserId, PlayerGameInfo>;
	trades: TradeInfo[];
};

export type LobbyPlayerInfo = {
	ready?: boolean;
	race?: RaceType;
};

export type PlayerGameInfo = {
	race: RaceType;
	resources: ResourceAmount[];
	tradePreferences?: TradePreferences;
};

export function getDefaultGameState(id: string, adminId: UserId): GameState {
	return {
		id,
		adminId: adminId,
		state: 'lobby',
		players: [],
		usernameMap: {},
		lobbyInfoMap: {},
		gameInfo: {},
		trades: []
	};
}

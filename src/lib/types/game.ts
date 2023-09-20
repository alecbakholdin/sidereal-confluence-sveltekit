import type { RaceType } from './race';
import type { ResourceAmount } from './resource';
import type { TradeInfo, TradePreferences } from './trade';
import type { UserId } from './user';

export type GameState = {
	id: string;
	adminId: string;

	state: 'lobby' | 'inProgress';
	turn: number;
	phase: number;
	phases: ('trade' | 'economy' | 'confluence')[];

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
		turn: 1,
		phase: 0,
		phases: ['trade', 'economy', 'confluence'],

		players: [],
		usernameMap: {},
		lobbyInfoMap: {},
		gameInfo: {},
		trades: []
	};
}

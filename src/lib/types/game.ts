import type { PlayerCard } from './cards/card';
import type { RaceType } from './race';
import type { ResourceAmount } from './resource';
import type { TradeInfo, TradePreferences } from './trade';
import type { UserId } from './user';

export type GameState = {
	id: string;
	adminId: string;

	state: 'lobby' | 'inProgress';
	turn: number;
	turns: TurnInfo[];
	phase: number;
	phases: ('trade' | 'economy' | 'confluence')[];

	players: UserId[];
	usernameMap: Record<UserId, string>;
	lobbyInfoMap: Record<UserId, LobbyPlayerInfo>;
	gameInfo: Record<UserId, PlayerGameInfo>;
	trades: TradeInfo[];

	serverInfo?: {
		colonyDeck: string[];
	}
};

export type TurnInfo = {
	turnNumber: number;
	sharingBonus: number;
	yengiiSharingBonus: number;
	playerCounts: number[]
}

export type LobbyPlayerInfo = {
	ready?: boolean;
	race?: RaceType;
};

export type PlayerGameInfo = {
	race: RaceType;
	resources: ResourceAmount[];
	tradePreferences?: TradePreferences;

	converterCards: PlayerCard[];
	colonies: PlayerCard[];
	researchTeams: PlayerCard[];

	ready: boolean;
};

export function getDefaultGameState(id: string, adminId: UserId): GameState {
	return {
		id,
		adminId: adminId,

		state: 'lobby',
		turn: 1,
		turns: [],
		phase: 0,
		phases: ['trade', 'economy', 'confluence'],

		players: [],
		usernameMap: {},
		lobbyInfoMap: {},
		gameInfo: {},
		trades: []
	};
}

const availableTurnInfos: readonly TurnInfo[] = [
	{ turnNumber: 6, sharingBonus: 2, yengiiSharingBonus: 0, playerCounts: [4] },
	{ turnNumber: 6, sharingBonus: 0, yengiiSharingBonus: 0, playerCounts: [7, 8, 9, 10] },
	{ turnNumber: 6, sharingBonus: 1, yengiiSharingBonus: 0, playerCounts: [5, 6] },
	{ turnNumber: 1, sharingBonus: 7, yengiiSharingBonus: 2, playerCounts: [7, 8, 9, 10] },
	{ turnNumber: 1, sharingBonus: 6, yengiiSharingBonus: 3, playerCounts: [4, 5, 6] },
	{ turnNumber: 2, sharingBonus: 6, yengiiSharingBonus: 2, playerCounts: [5, 6, 7, 8, 9, 10] },
	{ turnNumber: 3, sharingBonus: 5, yengiiSharingBonus: 1, playerCounts: [5, 6, 7, 8, 9, 10] },
	{ turnNumber: 2, sharingBonus: 5, yengiiSharingBonus: 2, playerCounts: [4] },
	{ turnNumber: 4, sharingBonus: 4, yengiiSharingBonus: 1, playerCounts: [4, 5, 6, 7, 8, 9, 10] },
	{ turnNumber: 3, sharingBonus: 4, yengiiSharingBonus: 2, playerCounts: [4] },
	{ turnNumber: 5, sharingBonus: 3, yengiiSharingBonus: 1, playerCounts: [4, 5] },
	{ turnNumber: 5, sharingBonus: 2, yengiiSharingBonus: 0, playerCounts: [6, 7, 8, 9, 1] }
]
export function getTurnsForPlayerCount(playerCount: number) {
	const players = Math.max(4, playerCount);
	return availableTurnInfos.filter(({ playerCounts }) => playerCounts.includes(players)).sort((a, b) => a.turnNumber - b.turnNumber)
}
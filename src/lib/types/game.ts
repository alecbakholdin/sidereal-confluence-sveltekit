import type { PlayerCard } from './cards/card';
import type { Colony } from './cards/colony';
import type { ResearchTeam } from './cards/researchTeam';
import type { RaceInfo, RaceType } from './race';
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

	colonyBidTrack: BidTrack<Colony>[];
	colonyBidOrder?: BidOrder[];
	colonyActiveBidder?: number;
	researchTeamBidTrack: BidTrack<ResearchTeam>[];
	researchTeamBidOrder?: BidOrder[];
	researchTeamActiveBidder?: number;

	serverInfo?: {
		colonyDeck: string[];
	}
};

export interface BidTrack<T> {
	shipMinimum: number;
	card?: T;
	reservedBy?: UserId;
}

export type BidOrder = {
	user: UserId;
	shipsUsed: number;
	numCards: number;
	tiebreaker: number;
}

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
	raceInfo: RaceInfo;
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

		colonyBidTrack: [],
		researchTeamBidTrack: [],

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

const researchTeamBidTracks: readonly number[][] = [
	[1, 1, 2, 3],
	[1, 1, 2, 3, 3],
	[1, 1, 1, 2, 3, 3],
	[1, 1, 1, 2, 2, 3, 4],
	[1, 1, 1, 1, 2, 2, 3, 4],
	[1, 1, 1, 1, 2, 2, 3, 4, 4]
]
const colonyBidTracks: readonly number[][] = [
	[1, 1, 2, 3],
	[1, 1, 2, 3, 3],
	[1, 1, 1, 2, 3, 3],
	[1, 1, 1, 2, 2, 3, 4],
	[1, 1, 1, 1, 2, 2, 3, 4],
	[1, 1, 1, 1, 2, 2, 2, 4, 4],
	[1, 1, 1, 1, 1, 2, 2, 2, 4, 4]
]
function getBidTrackForPlayerCount<T>(arr: readonly number[][], playerCount: number): BidTrack<T>[] {
	const clippedPlayerCount = Math.min(Math.max(4, playerCount), arr.length - 1); // range is [4, arr.length)
	return arr[clippedPlayerCount - 4].map((shipMinimum): BidTrack<T> => ({ shipMinimum }));
}
export function getColonyBidTrack(playerCount: number) {
	return getBidTrackForPlayerCount<Colony>(colonyBidTracks, playerCount);
}
export function getResearchTeamBidTrack(playerCount: number) {
	return getBidTrackForPlayerCount<ResearchTeam>(researchTeamBidTracks, playerCount);
}
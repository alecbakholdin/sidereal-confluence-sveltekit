import { object } from 'zod';
import type { ResourceAmount } from './resource';

export const availableRaces = [
	'Caylion',
	'Faderan',
	"Kt'zr'kt'rtl",
	'Kjasjavikalimm',
	'Unity'
] as const;
export type RaceType = (typeof availableRaces)[number];

export type RaceInfo = {
	name: RaceType;
	image: string;
	color: string;

	colonySupport: number;
	tiebreaker: number;
	startingColonies: number;
	startingResearchTeams: number;

	startingResources?: readonly ResourceAmount[];
};

export const raceInfo: readonly RaceInfo[] = [
	{
		name: 'Caylion',
		image: '/images/races/Caylion.webp',
		color: '#1ad624',

		colonySupport: 3,
		tiebreaker: 1,
		startingColonies: 1,
		startingResearchTeams: 0,

		startingResources: [
			{ resource: 'black', quantity: 2 },
			{ resource: 'green', quantity: 5 },
			{ resource: 'white', quantity: 4 },
			{ resource: 'brown', quantity: 2 },
			{ resource: 'ship', quantity: 1 }
		]
	},
	{
		name: 'Faderan',
		image: '/images/races/Faderan.webp',
		color: 'rgb(200, 231, 75)',

		colonySupport: 4,
		tiebreaker: 7,
		startingColonies: 1,
		startingResearchTeams: 1,

		startingResources: [
			{ resource: 'hexagon', quantity: 1 },
			{ resource: 'yellow', quantity: 1 },
			{ resource: 'blue', quantity: 1 },
			{ resource: 'white', quantity: 3 },
			{ resource: 'brown', quantity: 1 },
			{ resource: 'ship', quantity: 2 }
		]
	},
	{
		name: 'Kjasjavikalimm',
		image: '/images/races/Kjasjavikalimm.webp',
		color: 'rgb(177, 43, 43)',
		colonySupport: 6,
		tiebreaker: 6,
		startingColonies: 2,
		startingResearchTeams: 0,

		startingResources: [
			{ resource: 'hexagon', quantity: 1 },
			{ resource: 'yellow', quantity: 1 },
			{ resource: 'blue', quantity: 1 },
			{ resource: 'white', quantity: 3 },
			{ resource: 'brown', quantity: 1 },
			{ resource: 'ship', quantity: 2 }
		]
	}
	/* 	{
		name: "Kt'zr'kt'rtl",
		image: "/images/races/Kt'zr'kt'rtl.webp",
		color: 'rgb(221, 137, 58)'
	},

	{
		name: 'Unity',
		image: '/images/races/Unity.webp',
		color: 'rgb(123, 121, 121)'
	} */
] as const;
export const raceInfoMap: Record<string, RaceInfo> = raceInfo.reduce(
	(obj, race) => ({ ...obj, [race.name]: race }),
	{}
);

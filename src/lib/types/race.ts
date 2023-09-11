import { object } from 'zod';
import type { ResourceAmount } from './resource';

export const availableRaces = ['Caylion', 'Faderan', "Kt'zr'kt'rtl", 'Kjasjavikalimm'] as const;
export type RaceType = (typeof availableRaces)[number];

export type RaceInfo = {
	name: RaceType;
	image: string;
	color: string;
	startingResources?: ResourceAmount[];
};

export const raceInfo: RaceInfo[] = [
	{
		name: 'Caylion',
		image: '/images/races/Caylion.webp',
		color: '#1ad624',
		startingResources: [
			{
				resource: 'green',
				quantity: 4
			},
			{
				resource: 'blue',
				quantity: 5
			}
		]
	},
	{
		name: 'Faderan',
		image: '/images/races/Faderan.webp',
		color: 'rgb(200, 231, 75)',
		startingResources: [
			{
				resource: 'hexagon',
				quantity: 50
			}
		]
	},
	{
		name: "Kt'zr'kt'rtl",
		image: "/images/races/Kt'zr'kt'rtl.webp",
		color: 'rgb(221, 137, 58)'
	},
	{
		name: 'Kjasjavikalimm',
		image: '/images/races/Kjasjavikalimm.webp',
		color: 'rgb(177, 43, 43)'
	}
] as const;
export const raceInfoMap: Record<string, RaceInfo> = raceInfo.reduce(
	(obj, race) => ({ ...obj, [race.name]: race }),
	{}
);

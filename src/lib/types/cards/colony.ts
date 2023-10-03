import { textChangeRangeIsUnchanged } from 'typescript';
import type { CardWrapper, PlayerCard } from './card';
import type { Converter, SingleConverter } from './converter';

export const colonyTypes = ['Ice', 'Jungle', 'Desert', 'Ocean', 'any'] as const;
export type ColonyType = (typeof colonyTypes)[number];

export type Colony = {
	id: string;
	title: string;
	frontType?: ColonyType;
	backType?: ColonyType;

	acquisitionConverter?: SingleConverter[];
	frontConverters?: SingleConverter[];
	upgradeConverters?: SingleConverter[];
	backConverters?: SingleConverter[];
};

export class ColonyCardWrapper implements CardWrapper {
	private colony: Colony;

	constructor(private playerCard: PlayerCard) {
		if (playerCard.cardType !== 'Colony')
			throw new Error('Expected Colony but got ' + playerCard.cardType);

		this.colony = playerCard.colony!;
		if (!this.colony)
			throw new Error('Colony is not set for ColonyCardWrapper ' + JSON.stringify(playerCard));
	}

	markForEconomy(converter: number, status: boolean): boolean {
		const converters =
			(this.playerCard.upgraded ? this.colony.backConverters : this.colony.frontConverters) ?? [];
		const len = converters?.length ?? 0;
		if (converter >= len || converter < 0) throw new Error('Invalid converter number ' + converter);

		if (!this.playerCard.reservedConverters)
			this.playerCard.reservedConverters = converters.map(() => false);
		this.playerCard.reservedConverters[converter] = status;
		return true;
	}
	upgrade(optionNumber: number): SingleConverter {
		if (this.playerCard.upgraded) return {};
		this.playerCard.upgraded = true;
		this.playerCard.reservedConverters = this.colony.backConverters?.map(() => false) || [];
		return this.colony.upgradeConverters![optionNumber];
	}
	get(): PlayerCard {
		throw new Error('Method not implemented.');
	}
}

export const colonies: Colony[] = [
	{
		id: 'colony_279',
		title: 'Acrux',
		frontType: 'Desert',
		backType: 'Ice',
		frontConverters: [{ output: { resource: { black: 1 } } }],
		upgradeConverters: [{ input: { resource: { white: 2 } } }],
		backConverters: [{ output: { resource: { black: 1, white: 1 } } }]
	},
	{
		id: 'colony_280',
		title: 'Spica',
		frontType: 'Ice',
		backType: 'Ocean',
		frontConverters: [{ output: { resource: { white: 1 } } }],
		upgradeConverters: [{ input: { resource: { green: 2 } } }],
		backConverters: [{ output: { resource: { green: 1, white: 1 } } }]
	},
	{
		id: 'colony_281',
		title: 'Antares',
		frontType: 'Jungle',
		backType: 'Ice',
		frontConverters: [{ output: { resource: { green: 1 } } }],
		upgradeConverters: [{ input: { resource: { hexagon: 1 } } }],
		backConverters: [{ input: { resource: { green: 1 } }, output: { resource: { hexagon: 1 } } }]
	},
	{
		id: 'colony_282',
		title: 'Mimosa',
		frontType: 'Ice',
		backType: 'Jungle',
		frontConverters: [{ output: { resource: { white: 1 } } }],
		upgradeConverters: [{ input: { resource: { blue: 1 } } }],
		backConverters: [{ output: { resource: { blue: 1 } } }]
	},
	{
		id: 'colony_283',
		title: 'Regulus',
		frontType: 'Jungle',
		backType: 'Desert',
		frontConverters: [{ output: { resource: { white: 1 } } }],
		upgradeConverters: [{ input: { resource: { yellow: 1 } } }],
		backConverters: [{ output: { resource: { yellow: 1 } } }]
	},
	{
		id: 'colony_284',
		title: 'Castor',
		frontType: 'Ocean',
		backType: 'Ice',
		frontConverters: [{ output: { resource: { white: 1 } } }],
		upgradeConverters: [{ input: { resource: { black: 1 } } }],
		backConverters: [{ output: { resource: { black: 1 } } }]
	},
	{
		id: 'colony_285',
		title: 'Miaplacidus',
		frontType: 'Ocean',
		backType: 'Desert',
		frontConverters: [{ output: { resource: { green: 1 } } }],
		upgradeConverters: [{ input: { resource: { black: 1 } } }],
		backConverters: [{ output: { resource: { black: 1 } } }]
	},
	{
		id: 'colony_286',
		title: 'Toliman',
		frontType: 'Desert',
		backType: 'Ice',
		frontConverters: [{ output: { resource: { white: 1 } } }],
		upgradeConverters: [{ input: { resource: { black: 1 } } }],
		backConverters: [{ output: { resource: { black: 1 } } }]
	},
	{
		id: 'colony_287',
		title: 'Wezen',
		frontType: 'Jungle',
		backType: 'Ocean',
		frontConverters: [{ output: { resource: { brown: 1 } } }],
		upgradeConverters: [{ input: { resource: { black: 1 } } }],
		backConverters: [{ output: { resource: { black: 1 } } }]
	},
	{
		id: 'colony_288',
		title: 'Mirfak',
		frontType: 'Jungle',
		backType: 'Ice',
		frontConverters: [{ output: { resource: { green: 1 } } }],
		upgradeConverters: [{ input: { resource: { black: 1 } } }],
		backConverters: [{ output: { resource: { black: 1 } } }]
	},
	{
		id: 'colony_289',
		title: 'Benetnasch',
		frontType: 'Ocean',
		backType: 'Jungle',
		frontConverters: [{ output: { resource: { green: 1 } } }],
		upgradeConverters: [{ input: { resource: { blue: 1 } } }],
		backConverters: [{ output: { resource: { blue: 1 } } }]
	},
	{
		id: 'colony_290',
		title: 'Sargas',
		frontType: 'Desert',
		backType: 'Jungle',
		frontConverters: [{ output: { resource: { brown: 1 } } }],
		upgradeConverters: [{ input: { resource: { yellow: 1 } } }],
		backConverters: [{ output: { resource: { yellow: 1 } } }]
	},
	{
		id: 'colony_291',
		title: 'Peacock',
		frontType: 'Desert',
		backType: 'Jungle',
		frontConverters: [{ output: { resource: { brown: 1 } } }],
		upgradeConverters: [{ input: { resource: { black: 1 } } }],
		backConverters: [{ output: { resource: { black: 1 } } }]
	},
	{
		id: 'colony_292',
		title: 'Koo She',
		frontType: 'Desert',
		backType: 'Ocean',
		frontConverters: [{ output: { resource: { brown: 1 } } }],
		upgradeConverters: [{ input: { resource: { blue: 1 } } }],
		backConverters: [{ output: { resource: { blue: 1 } } }]
	},
	{
		id: 'colony_293',
		title: 'Polaris',
		frontType: 'Ocean',
		backType: 'Desert',
		frontConverters: [{ output: { resource: { brown: 1 } } }],
		upgradeConverters: [{ input: { resource: { yellow: 1 } } }],
		backConverters: [{ output: { resource: { yellow: 1 } } }]
	},
	{
		id: 'colony_294',
		title: 'Fomalhaut',
		frontType: 'Ice',
		backType: 'Desert',
		frontConverters: [{ output: { resource: { brown: 1 } } }],
		upgradeConverters: [{ input: { resource: { hexagon: 1 } } }],
		backConverters: [{ input: { resource: { brown: 1 } }, output: { resource: { hexagon: 1 } } }]
	},
	{
		id: 'colony_295',
		title: 'Gacrux',
		frontType: 'Ice',
		backType: 'Desert',
		frontConverters: [{ output: { resource: { white: 1 } } }],
		upgradeConverters: [{ input: { resource: { yellow: 1 } } }],
		backConverters: [{ output: { resource: { yellow: 1 } } }]
	},
	{
		id: 'colony_296',
		title: 'Betelgeuse',
		frontType: 'Ice',
		backType: 'Jungle',
		frontConverters: [{ output: { resource: { white: 1 } } }],
		upgradeConverters: [{ input: { resource: { hexagon: 1 } } }],
		backConverters: [{ input: { resource: { white: 1 } }, output: { resource: { hexagon: 1 } } }]
	},
	{
		id: 'colony_297',
		title: 'Arcturus',
		frontType: 'Ice',
		backType: 'Ocean',
		frontConverters: [{ output: { resource: { brown: 1 } } }],
		upgradeConverters: [{ input: { resource: { blue: 1 } } }],
		backConverters: [{ output: { resource: { blue: 1 } } }]
	},
	{
		id: 'colony_298',
		title: 'Alnair',
		frontType: 'Ice',
		backType: 'Ocean',
		frontConverters: [{ output: { resource: { brown: 1 } } }],
		upgradeConverters: [{ input: { resource: { black: 1 } } }],
		backConverters: [{ output: { resource: { black: 1 } } }]
	},
	{
		id: 'colony_299',
		title: 'Alioth',
		frontType: 'Ice',
		backType: 'Desert',
		frontConverters: [{ output: { resource: { white: 1 } } }],
		upgradeConverters: [{ input: { resource: { brown: 2 } } }],
		backConverters: [{ output: { resource: { brown: 1, white: 1 } } }]
	},
	{
		id: 'colony_300',
		title: 'Adara',
		frontType: 'Jungle',
		backType: 'Ice',
		frontConverters: [{ output: { resource: { green: 1 } } }],
		upgradeConverters: [{ input: { resource: { white: 2 } } }],
		backConverters: [{ output: { resource: { green: 1, white: 1 } } }]
	},
	{
		id: 'colony_301',
		title: 'Sirius',
		frontType: 'Jungle',
		backType: 'Ice',
		frontConverters: [{ output: { resource: { green: 1 } } }],
		upgradeConverters: [{ input: { resource: { black: 1 } } }],
		backConverters: [{ output: { resource: { black: 1 } } }]
	},
	{
		id: 'colony_302',
		title: 'Rigel',
		frontType: 'Jungle',
		backType: 'Ocean',
		frontConverters: [{ output: { resource: { green: 1 } } }],
		upgradeConverters: [{ input: { resource: { blue: 1 } } }],
		backConverters: [{ output: { resource: { blue: 1 } } }]
	},
	{
		id: 'colony_303',
		title: 'El Nath',
		frontType: 'Jungle',
		backType: 'Ocean',
		frontConverters: [{ output: { resource: { green: 1 } } }],
		upgradeConverters: [{ input: { resource: { blue: 1 } } }],
		backConverters: [{ output: { resource: { blue: 1 } } }]
	},
	{
		id: 'colony_304',
		title: 'Aldebaran',
		frontType: 'Jungle',
		backType: 'Desert',
		frontConverters: [{ output: { resource: { brown: 1 } } }],
		upgradeConverters: [{ input: { resource: { yellow: 1 } } }],
		backConverters: [{ output: { resource: { yellow: 1 } } }]
	},
	{
		id: 'colony_305',
		title: 'Atria',
		frontType: 'Jungle',
		backType: 'Desert',
		frontConverters: [{ output: { resource: { green: 1 } } }],
		upgradeConverters: [{ input: { resource: { yellow: 1 } } }],
		backConverters: [{ output: { resource: { yellow: 1 } } }]
	},
	{
		id: 'colony_306',
		title: 'Alnitak',
		frontType: 'Ocean',
		backType: 'Ice',
		frontConverters: [{ output: { resource: { green: 1 } } }],
		upgradeConverters: [{ input: { resource: { hexagon: 1 } } }],
		backConverters: [{ input: { resource: { green: 1 } }, output: { resource: { hexagon: 1 } } }]
	},
	{
		id: 'colony_307',
		title: 'Hadar',
		frontType: 'Ocean',
		backType: 'Jungle',
		frontConverters: [{ output: { resource: { green: 1 } } }],
		upgradeConverters: [{ input: { resource: { yellow: 1 } } }],
		backConverters: [{ output: { resource: { yellow: 1 } } }]
	},
	{
		id: 'colony_308',
		title: 'Capella',
		frontType: 'Ocean',
		backType: 'Jungle',
		frontConverters: [{ output: { resource: { green: 1 } } }],
		upgradeConverters: [{ input: { resource: { blue: 1 } } }],
		backConverters: [{ output: { resource: { blue: 1 } } }]
	},
	{
		id: 'colony_309',
		title: 'Shaula',
		frontType: 'Desert',
		backType: 'Jungle',
		frontConverters: [{ output: { resource: { brown: 1 } } }],
		upgradeConverters: [{ input: { resource: { green: 2 } } }],
		backConverters: [{ output: { resource: { brown: 1, green: 1 } } }]
	},
	{
		id: 'colony_310',
		title: 'Canopus',
		frontType: 'Desert',
		backType: 'Ice',
		frontConverters: [{ output: { resource: { brown: 1 } } }],
		upgradeConverters: [{ input: { resource: { hexagon: 1 } } }],
		backConverters: [{ input: { resource: { brown: 1 } }, output: { resource: { hexagon: 1 } } }]
	},
	{
		id: 'colony_311',
		title: 'Vega',
		frontType: 'Desert',
		backType: 'Jungle',
		frontConverters: [{ output: { resource: { brown: 1 } } }],
		upgradeConverters: [{ input: { resource: { blue: 1 } } }],
		backConverters: [{ output: { resource: { blue: 1 } } }]
	},
	{
		id: 'colony_312',
		title: 'Altair',
		frontType: 'Ocean',
		backType: 'Desert',
		frontConverters: [{ output: { resource: { green: 1 } } }],
		upgradeConverters: [{ input: { resource: { yellow: 1 } } }],
		backConverters: [{ output: { resource: { yellow: 1 } } }]
	},
	{
		id: 'colony_313',
		title: 'Suhail',
		frontType: 'Ocean',
		backType: 'Ice',
		frontConverters: [{ output: { resource: { white: 1 } } }],
		upgradeConverters: [{ input: { resource: { black: 1 } } }],
		backConverters: [{ output: { resource: { black: 1 } } }]
	},
	{
		id: 'colony_314',
		title: 'Pollux',
		frontType: 'Desert',
		backType: 'Ocean',
		frontConverters: [{ output: { resource: { white: 1 } } }],
		upgradeConverters: [{ input: { resource: { blue: 1 } } }],
		backConverters: [{ output: { resource: { blue: 1 } } }]
	},
	{
		id: 'colony_315',
		title: 'Deneb',
		frontType: 'Ice',
		backType: 'Ocean',
		frontConverters: [{ output: { resource: { white: 1 } } }],
		upgradeConverters: [{ input: { resource: { black: 1 } } }],
		backConverters: [{ output: { resource: { black: 1 } } }]
	},
	{
		id: 'colony_316',
		title: 'Bellatrix',
		frontType: 'Ocean',
		backType: 'Desert',
		frontConverters: [{ output: { resource: { white: 1 } } }],
		upgradeConverters: [{ input: { resource: { yellow: 1 } } }],
		backConverters: [{ output: { resource: { yellow: 1 } } }]
	},
	{
		id: 'colony_317',
		title: 'Achernar',
		frontType: 'Ice',
		backType: 'Jungle',
		frontConverters: [{ output: { resource: { white: 1 } } }],
		upgradeConverters: [{ input: { resource: { blue: 1 } } }],
		backConverters: [{ output: { resource: { blue: 1 } } }]
	},
	{
		id: 'colony_318',
		title: 'Procyon',
		frontType: 'Desert',
		backType: 'Ocean',
		frontConverters: [{ output: { resource: { brown: 1 } } }],
		upgradeConverters: [{ input: { resource: { yellow: 1 } } }],
		backConverters: [{ output: { resource: { yellow: 1 } } }]
	}
];

export const colonyIds = colonies.map(({ id }) => id);
export const colonyMap = Object.fromEntries(colonies.map((colony) => [colony.id, colony]));

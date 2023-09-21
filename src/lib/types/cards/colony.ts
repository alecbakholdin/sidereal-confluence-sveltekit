import type { Converter } from './converter';

export const colonyTypes = ['white', 'green', 'red', 'blue', 'any'] as const;
export type ColonyType = (typeof colonyTypes)[number];

export type Colony = {
	id: string;
    title: string;
	frontType?: ColonyType;
    backType?: ColonyType;

	acquisitionConverter?: Converter[];
	frontConverters?: Converter[];
	upgradeConverters?: Converter[];
	backConverters?: Converter[];
};

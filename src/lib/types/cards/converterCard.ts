import type { Converter } from "./converter";

export type ConverterCard = {
    id: string;
    title: string;
    age: 1 | 2 | 3;

    isStartingCard?: boolean;
    technology?: string;

	acquisitionConverter?: Converter[];
	frontConverters?: Converter[];
	backConverters?: Converter[];
    upgradeOptions?: ConverterCardUpgradeOptions[];
}

export type ConverterCardUpgradeOptions = {
    technology?: string;
    converter?: Converter;
}
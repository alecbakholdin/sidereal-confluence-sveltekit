import type { EntityContainer } from '../entityContainer';

export interface Converter {
	input?: EntityContainer | EntityContainer[];
	output?: EntityContainer;
}

export interface SingleConverter extends Converter {
	input?: EntityContainer;
	output?: EntityContainer;
}

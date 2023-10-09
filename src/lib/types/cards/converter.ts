import { resolveResourceUpdate, type EntityContainer } from '../entityContainer';
import type { PlayerGameInfo } from '../game';

export interface Converter {
	input?: EntityContainer | EntityContainer[];
	output?: EntityContainer;
}

export interface SingleConverter extends Converter {
	input?: EntityContainer;
	output?: EntityContainer;
}


export function resolveConverters(gameInfo: PlayerGameInfo, converters: SingleConverter[]) {
	for(const converter of converters) {
		resolveResourceUpdate(gameInfo, converter.input, converter.output);
	}
}
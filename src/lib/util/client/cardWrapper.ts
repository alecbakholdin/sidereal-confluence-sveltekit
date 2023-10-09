import type { SingleConverter } from '$lib/types/cards/converter';
import type { PlayerGameInfo } from '$lib/types/game';
import type { CardWrapper, PlayerCard } from '../../types/cards/card';
import { ColonyCardWrapper } from '../../types/cards/colony';
import { ConverterCardCardWrapper } from '../../types/cards/converterCard';

export function getCardWrapper(card: PlayerCard): CardWrapper<any> {
	switch (card.cardType) {
		case 'Colony':
			return new ColonyCardWrapper(card);
		case 'Converter':
			return new ConverterCardCardWrapper(card);
		default:
			throw new Error('Unhandled type ' + card.cardType);
	}
}

export function getReservedConverters(playerInfo: PlayerGameInfo): SingleConverter[] {
	const econCards = [...playerInfo.colonies, ...playerInfo.converterCards];
	return econCards.flatMap((x) => getCardWrapper(x).getReservedConverters());
}

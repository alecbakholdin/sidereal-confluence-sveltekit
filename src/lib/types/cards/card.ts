import type { UserId } from '../user';
import type { SingleConverter } from './converter';
import type { TechnologyType } from './researchTeam';

export type CardType = 'Colony' | 'Converter' | 'Research Team';
export type PlayerCard = {
	cardId: string;
	ownerId: UserId;
	upgraded: boolean;
	cardType: CardType;
	reservedConverters: boolean[]; // length should match the number of converters

	caylionDoubled?: boolean;
};

export type UpgradeOption = {
	converter?: SingleConverter,
	technology?: TechnologyType;
}

export abstract class CardWrapper<T> {
	abstract cardType: CardType;
	constructor(protected playerCard: PlayerCard) {}

	abstract getActiveConverters(): SingleConverter[];
	abstract getUpgradeOptions(): UpgradeOption[];

    upgrade(optionNumber: number): UpgradeOption{
		const upgradeOptions = this.getUpgradeOptions();
        if(this.playerCard.upgraded || optionNumber >= upgradeOptions.length) {};
        this.playerCard.upgraded = true;
        this.playerCard.reservedConverters = this.getActiveConverters().map(() => false);
		return this.getUpgradeOptions()[optionNumber];
    }

	markForEconomy(converter: number, status: boolean): boolean {
		const converters = this.getActiveConverters();
		const len = converters?.length ?? 0;
		if (converter >= len || converter < 0) throw new Error('Invalid converter number ' + converter);

		if (!this.playerCard.reservedConverters)
			this.playerCard.reservedConverters = converters.map(() => false);
		this.playerCard.reservedConverters[converter] = status;
		return true;
	}
	getReservedConverters(): SingleConverter[] {
		const activeConverters = this.getActiveConverters();
		const reserved = this.playerCard.reservedConverters;
		return activeConverters.filter((x, i) => x && reserved[i]);
	}
}

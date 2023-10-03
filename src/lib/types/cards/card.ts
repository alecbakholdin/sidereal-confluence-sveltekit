import type { UserId } from "../user";
import { ColonyCardWrapper, type Colony } from "./colony";
import type { Converter, SingleConverter } from "./converter";
import type { ResearchTeam } from "./researchTeam";

export type CardType = 'Colony' | 'Converter' | 'Research Team'
export type PlayerCard = {
    cardId: string;
    ownerId: UserId;
    upgraded: boolean;
    cardType: CardType;
    reservedConverters: boolean[]; // length should match the number of converters

    colony?: Colony;
    converter?: Converter;
    researchTeam?: ResearchTeam;
}

export interface CardWrapper {
    markForEconomy(converter: number, status: boolean): boolean;
    upgrade(optionNumber: number): SingleConverter;

    get(): PlayerCard;
}

export function getCardWrapper(card: PlayerCard): CardWrapper {
    switch(card.cardType) {
        case "Colony":
            return new ColonyCardWrapper(card);
        default:
            throw new Error("Unhandled type " + card.cardType);
    }
}
import type { UserId } from "../user";

export type PlayerCard = {
    cardId: string;
    ownerId: UserId;
    upgraded: boolean;
}
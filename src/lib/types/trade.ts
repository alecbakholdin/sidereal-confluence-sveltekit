import type { ResourceAmount } from "./resource";
import type { UserId } from "./user";

export type TradeInfo = {
    creator: UserId;
    askingFor: TradeEntity[];
    offering: TradeEntity[];
    note: string;
}

export type TradeEntity = {
    resourceAmount?: ResourceAmount;
}
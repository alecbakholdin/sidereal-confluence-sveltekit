import { z } from 'zod';
import { entityContainerSchema } from './entityContainer';

export const tradePreferencesSchema = z.object({
	lookingfor: entityContainerSchema,
	offering: entityContainerSchema,
	note: z.string().optional()
});
export type TradePreferences = z.infer<typeof tradePreferencesSchema>;

export const tradeInfoSchema = z.object({
	creator: z.string().nonempty(),
	askingFor: entityContainerSchema,
	offering: entityContainerSchema,
	note: z.string().optional()
});
export type TradeInfo = z.infer<typeof tradeInfoSchema>;

export const tradeProposalSchema = z.object({
	srcPlayerId: z.string().nonempty(),
	destPlayerId: z.string().nonempty(),
	askingFor: entityContainerSchema,
	offering: entityContainerSchema,
	note: z.string().optional(),
	serverSignature: z.string().optional()
});
export type TradeProposal = z.infer<typeof tradeProposalSchema>;

import { z } from 'zod';
import { resources, type ResourceAmount, type ResourceType } from './resource';
import type { UserId } from './user';

export const entityContainerSchema = z.object({
	resource: z.object(
		Object.fromEntries(resources.map((r) => [r, z.number().nonnegative().int().optional()]))
	)
});
export type EntityContainer = z.infer<typeof entityContainerSchema>;
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

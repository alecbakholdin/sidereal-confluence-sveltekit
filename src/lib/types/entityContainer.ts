import { z } from 'zod';
import { resources } from './resource';
import { colonyTypes } from './cards/colony';

const quantitySchema = z.number().nonnegative().int();

export const entityContainerSchema = z.object({
	resource: z.object(Object.fromEntries(resources.map((r) => [r, quantitySchema.optional()]))).optional(),
	donation: z.object(Object.fromEntries(resources.map((r) => [r, quantitySchema.optional()]))).optional(),
	colonyTypes: z.object(Object.fromEntries(colonyTypes.map((c) => [c, quantitySchema.optional()]))).optional(),
    sharingBonus: z.boolean().optional()
});
export type EntityContainer = z.infer<typeof entityContainerSchema>;

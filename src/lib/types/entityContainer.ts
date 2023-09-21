import { z } from 'zod';
import { resources } from './resource';
import { colonyTypes } from './cards/colony';

const quantitySchema = z.number().nonnegative().int();

export const entityContainerSchema = z.object({
	resource: z.object(Object.fromEntries(resources.map((r) => [r, quantitySchema.optional()]))).optional(),
	donations: z.object(Object.fromEntries(resources.map((r) => [r, quantitySchema.optional()]))).optional(),
	colonyTypes: z.object(Object.fromEntries(colonyTypes.map((c) => [c, quantitySchema.optional()]))).optional()
});
export type EntityContainer = z.infer<typeof entityContainerSchema>;

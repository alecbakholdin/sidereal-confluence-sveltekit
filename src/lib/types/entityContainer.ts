import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { colonyTypes } from './cards/colony';
import type { PlayerGameInfo } from './game';
import { resources } from './resource';

const quantitySchema = z.number().nonnegative().int();

const resourceContainerSchema = z.record(z.enum(resources), quantitySchema.optional());

export const entityContainerSchema = z.object({
	resource: resourceContainerSchema.optional(),
	donation: resourceContainerSchema.optional(),
	colonyTypes: z
		.object(Object.fromEntries(colonyTypes.map((c) => [c, quantitySchema.optional()])))
		.optional(),
	sharingBonus: z.boolean().optional()
});
export type EntityContainer = z.infer<typeof entityContainerSchema>;

export function resolveResourceUpdate(
	gameInfo: PlayerGameInfo,
	input?: EntityContainer,
	output?: EntityContainer,
	opts?: {
		allowDonationsAsInputs?: boolean;
	}
) {
	for (const resource of resources) {
		let qty = input?.resource?.[resource];
		if (!qty) continue;

		const allowDonations = opts?.allowDonationsAsInputs;
		const resourceAmounts = gameInfo.resources.filter(
			({ resource: r, donation: d }) => r === resource && (allowDonations || !d)
		);
		const totalAvailable = resourceAmounts.reduce((total, { quantity }) => total + quantity, 0);
		if (totalAvailable < qty) throw error(400, { message: 'User does not have enough resources' });

		const donationAmt = resourceAmounts[0].donation ? resourceAmounts[0] : resourceAmounts[1];
		const regularAmt = resourceAmounts[0].donation ? resourceAmounts[1] : resourceAmounts[0];

		if (donationAmt) {
			const deduction = Math.min(donationAmt.quantity, qty);
			donationAmt.quantity -= deduction;
			qty -= deduction;
		}
		if (regularAmt && qty) {
			regularAmt.quantity -= qty;
		}
	}

	for (const resource of resources) {
		let qty = output?.resource?.[resource];
		if (!qty) continue;

		let resourceAmount = gameInfo.resources.find(
			({ resource: r, donation }) => r === resource && !donation
		);
		if (!resourceAmount) {
			resourceAmount = { resource, quantity: qty, donation: false };
			gameInfo.resources.push(resourceAmount);
		} else {
			resourceAmount.quantity += qty;
		}
	}

	for (const resource of resources) {
		let qty = output?.donation?.[resource];
		if (!qty) continue;

		let resourceAmount = gameInfo.resources.find(
			({ resource: r, donation }) => r === resource && donation
		);
		if (!resourceAmount) {
			resourceAmount = { resource, quantity: qty, donation: true };
			gameInfo.resources.push(resourceAmount);
		} else {
			resourceAmount.quantity += qty;
		}
	}

	gameInfo.resources = gameInfo.resources.filter((x) => x.quantity);
}

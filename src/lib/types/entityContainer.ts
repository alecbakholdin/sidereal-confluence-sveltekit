import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { colonyTypes } from './cards/colony';
import type { PlayerGameInfo } from './game';
import { resources, type ResourceType } from './resource';

const quantitySchema = z.number().nonnegative().int();

const resourceContainerSchema = z.record(z.enum(resources), quantitySchema.optional());
type ResourceContainer = z.infer<typeof resourceContainerSchema>;

export const entityContainerSchema = z.object({
	resource: resourceContainerSchema.optional(),
	donation: resourceContainerSchema.optional(),
	colonyTypes: z.record(z.enum(colonyTypes), quantitySchema.optional()).optional(),
	cards: z.array(z.string()).optional(),
	sharingBonus: z.boolean().optional()
});
export type EntityContainer = z.infer<typeof entityContainerSchema>;

function mergeResources<T extends Record<string, number>>(obj?: T, ...objs: T[]): T {
	const objArr: T[] = objs.filter((x) => x);
	if (obj) objArr.push(obj);

	const result = {} as Record<string, number>;
	for (const obj of objArr) {
		for (const [key, val] of Object.entries(obj)) {
			result[key] = (result[key] ?? 0) + val;
		}
	}
	return result as T;
}

export function mergeEntityContainers(
	container?: EntityContainer,
	...containers: EntityContainer[]
): EntityContainer {
	const containerArr = containers.filter((x) => x);
	if (container) containerArr.push(container);
	return {
		resource: mergeResources(...containerArr.map((x) => x.resource).filter((x) => x)),
		donation: mergeResources(...containerArr.map((x) => x.donation).filter((x) => x)),
		colonyTypes: mergeResources(...containerArr.map((x) => x.colonyTypes).filter((x) => x)),
		cards: containerArr
			.flatMap((x) => x.cards || [])
			.filter((x, i, arr) => !arr.slice(0, i).includes(x)),
		sharingBonus: containerArr.reduce((out, x) => x.sharingBonus || out, false)
	};
}

export function invertEntityContainer(container: EntityContainer) {
	return {
		resource: Object.fromEntries(getResourceArr(container).map(([r, x]) => [r, -(x ?? 0)])),
		donation: Object.fromEntries(getDonationArr(container).map(([r, x]) => [r, -(x ?? 0)]))
	};
}

export function getResourceArr(entityContainer: EntityContainer) {
	return Object.entries(entityContainer.resource || {}) as [ResourceType, number][];
}
export function getDonationArr(entityContainer: EntityContainer) {
	return Object.entries(entityContainer.donation || {}) as [ResourceType, number][];
}

export function playerResourcesAsEntityContainer(playerInfo: PlayerGameInfo) {
	const resource = {} as Record<ResourceType, number>;
	const donation = {} as Record<ResourceType, number>;
	for(const resourceAmount of playerInfo.resources) {
		const obj = resourceAmount.donation ? donation : resource;
		obj[resourceAmount.resource] = resourceAmount.quantity;
	}
	return {resource, donation}
}

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

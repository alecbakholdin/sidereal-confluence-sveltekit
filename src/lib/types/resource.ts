import type { EntityContainer } from './entityContainer';

export const smallCubes = ['green', 'brown', 'white', 'unitySmall'] as const;
export type SmallCubeType = (typeof smallCubes)[number];
export const largeCubes = ['blue', 'yellow', 'black', 'unityLarge'] as const;
export type LargeCubeType = (typeof largeCubes)[number];
export const largeResources = ['hexagon', 'point', 'ship', ...largeCubes] as const;
export type LargeResourceType = (typeof largeResources)[number];
export const resources = [...largeResources, ...smallCubes] as const;
export type ResourceType = (typeof resources)[number];

export type ResourceAmount = {
	resource: ResourceType;
	quantity: number;
	donation?: boolean;
};

export function toSortedResourceArr(resourceAmounts: ResourceAmount[]) {
	return (
		[...(resourceAmounts || [])].sort(
			(a, b) => resources.indexOf(a.resource) - resources.indexOf(b.resource)
		) || []
	);
}

export function sortedResourceArrFromEntityContainer(entityContainer?: EntityContainer) {
	const resources = (
		Object.entries(entityContainer?.resource || {}) as [ResourceType, number][]
	).map(([r, qty]) => ({ resource: r, quantity: qty }) as ResourceAmount);
	const donations = (
		Object.entries(entityContainer?.donations || {}) as [ResourceType, number][]
	).map(([r, qty]) => ({ resource: r, quantity: qty, donation: true }) as ResourceAmount);
	return toSortedResourceArr([...resources, ...donations]);
}

export function sortResourceAmounts(arr: ResourceAmount[]) {
	return [...(arr || [])].sort((a, b) => {
		const totalA =
			(a.resource ? resources.indexOf(a.resource) : 0) + (a.donation ? 0 : resources.length);
		const totalB =
			(b.resource ? resources.indexOf(b.resource) : 0) + (b.donation ? 0 : resources.length);
		return totalA - totalB;
	});
}

export function sortByResource<T>(
	arr: T[],
	getResourceType: (item: T) => ResourceType | undefined
) {
	return [...(arr || [])].sort((a, b) => {
		const resourceA = getResourceType(a);
		const resourceB = getResourceType(b);
		return (
			(resourceA ? resources.indexOf(resourceA) : 0) -
			(resourceB ? resources.indexOf(resourceB) : 0)
		);
	});
}

export const smallResources = ['green', 'brown', 'white', 'unitySmall'] as const;
export type SmallResourceType = (typeof smallResources)[number];
export const largeResources = ['blue', 'yellow', 'black', 'unityLarge'] as const;
export type LargeResourceType = (typeof largeResources)[number];
export const resources = ['hexagon', ...largeResources, ...smallResources] as const;
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

export function sortResourceAmounts(
	arr: ResourceAmount[]
) {
	return [...(arr || [])].sort((a, b) => {
		const totalA = (a.resource ? resources.indexOf(a.resource) : 0) + (a.donation ? resources.length : 0);
		const totalB = (b.resource ? resources.indexOf(b.resource) : 0) + (b.donation ? resources.length : 0);
		return totalA - totalB;
	})
}

export function sortByResource<T>(
	arr: T[],
	getResourceType: (item: T) => ResourceType | undefined,
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

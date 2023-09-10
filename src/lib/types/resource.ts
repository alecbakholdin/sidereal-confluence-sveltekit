export const smallResources = ['green', 'brown', 'white', 'unitySmall'] as const;
export type SmallResourceType = (typeof smallResources)[number];
export const largeResources = ['blue', 'yellow', 'black', 'unityLarge'] as const;
export type LargeResourceType = (typeof largeResources)[number];
export const resources = ['hexagon', ...largeResources, ...smallResources] as const;
export type ResourceType = (typeof resources)[number];

export type ResourceAmount = {
	resource: ResourceType;
	quantity: number;
};

export function toSortedResourceArr(resourceAmounts: ResourceAmount[]) {
	return (
		[...resourceAmounts].sort(
			(a, b) => resources.indexOf(a.resource) - resources.indexOf(b.resource)
		) || []
	);
}

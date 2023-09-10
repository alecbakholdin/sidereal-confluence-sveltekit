export const smallResources = ['green', 'brown', 'white', 'unitySmall'] as const;
export type SmallResourceType = (typeof smallResources)[number];
export const largeResources = ['blue', 'yellow', 'black', 'unityLarge'] as const;
export type LargeResourceType = (typeof largeResources)[number];
export const resources = [...smallResources, ...largeResources, 'hexagon'] as const;
export type ResourceType = (typeof resources)[number];

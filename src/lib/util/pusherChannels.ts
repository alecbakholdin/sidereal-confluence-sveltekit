export function updateChannel(gameId: string) {
    return `private-gameupdates-${gameId}`;
}
export function presenceChannel(gameId: string) {
    return `presence-gamepresence-${gameId}`;
}
export function directChannel(gameId: string, userId: string) {
    return `private-gamedirect-${gameId}-${userId}`;
}

export const UPDATE_EVENT = 'update';
export function updateChannel(gameId: string) {
    return `private-gameupdates-${gameId}`;
}
export function presenceChannel(gameId: string) {
    return `presence-gamepresence-${gameId}`;
}

export const UPDATE_EVENT = 'update';
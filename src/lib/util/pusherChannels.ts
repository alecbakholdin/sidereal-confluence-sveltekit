export function cacheChannel(gameId: string) {
    return `cacheGame${gameId}`;
}

export function updateChannel(gameId: string) {
    return `updateGame${gameId}`;
}

export const UPDATE_EVENT = 'update';
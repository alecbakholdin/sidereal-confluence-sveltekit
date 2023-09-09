export function updateChannel(gameId: string) {
    return `privateUpdateGame${gameId}`;
}

export const UPDATE_EVENT = 'update';
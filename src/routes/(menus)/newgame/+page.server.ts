import { getDefaultGameState } from "$lib/types/game.js";
import { setGameState } from "$lib/util/server/gameState.server.js";
import { redirect } from "@sveltejs/kit";

export async function load() {
    const gameId = randomId();
    await setGameState(gameId, getDefaultGameState());
    throw redirect(308, `/game/${gameId}`)
}

const startChar = "A".charCodeAt(0);
function randomId() {
    return String.fromCharCode(...new Array(8).fill(0, 0).map(() => startChar + Math.floor(Math.random() * 26)));
}
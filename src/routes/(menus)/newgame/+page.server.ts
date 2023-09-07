import { redirect } from "@sveltejs/kit";

export async function load({url}) {
    throw redirect(308, `/game/${randomId()}`)
}

const startChar = "A".charCodeAt(0);
function randomId() {
    return String.fromCharCode(...new Array(8).fill(0, 0).map(() => startChar + Math.floor(Math.random() * 26)));
}
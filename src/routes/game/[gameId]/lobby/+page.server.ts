import { availableRaces } from '$lib/types/race.js';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const kickUserSchema = z.object({
	playerId: z.string()
});
const chooseRaceSchema = z.object({
	race: z.enum(availableRaces)
});

export async function load() {
	return {
		kickUserForm: await superValidate(kickUserSchema),
		chooseRaceSchema: await superValidate(chooseRaceSchema)
	};
}

export const actions = {
	async kickUser({ request, locals: { gameState, user } }) {
		const form = await superValidate(request, kickUserSchema);
		if (!form.valid) return fail(400, { form });
		if (user.id === form.data.playerId)
			return message(form, "Can't kick yourself", { status: 400 });
		gameState.players = gameState.players.filter((id) => id !== form.data.playerId);
		delete gameState.usernameMap[form.data.playerId];
	},
	async chooseRace({ request, locals: { gameState, user } }) {
		const form = await superValidate(request, chooseRaceSchema);
		if (!form.valid) return fail(400, { form });

		const { lobbyInfoMap } = gameState;
		const raceTaken = Object.entries(lobbyInfoMap).find(
			([playerId, { race, ready }]) => race === form.data.race && playerId !== user.id && ready
		);
		if (raceTaken)
			return message(form, 'This race has already been selected by someone else', { status: 400 });

		lobbyInfoMap[user.id].race = form.data.race;
	}
};

import { availableRaces, raceInfoMap } from '$lib/types/race.js';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const kickUserSchema = z.object({
	playerId: z.string()
});
const chooseRaceSchema = z.object({
	race: z.enum(availableRaces)
});
const emptySchema = z.object({});

export async function load() {
	return {
		kickUserForm: await superValidate(kickUserSchema),
		chooseRaceSchema: await superValidate(chooseRaceSchema),
		emptyForm: await superValidate(emptySchema)
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
		delete gameState.lobbyInfoMap[form.data.playerId];
		delete gameState.gameInfo[form.data.playerId];
	},
	async chooseRace({ request, locals: { gameState, user } }) {
		const form = await superValidate(request, chooseRaceSchema);
		if (!form.valid) return fail(400, { form });

		const { lobbyInfoMap } = gameState;
		if (lobbyInfoMap[user.id].ready)
			return message(form, 'Please unready before selecting a race', { status: 400 });
		const raceTaken = Object.entries(lobbyInfoMap).find(
			([playerId, { race, ready }]) => race === form.data.race && playerId !== user.id && ready
		);
		if (raceTaken)
			return message(form, 'This race has already been selected by someone else', { status: 400 });

		for (const lobbyInfo of Object.values(lobbyInfoMap)) {
			if (lobbyInfo.race === form.data.race) {
				lobbyInfo.race = undefined;
			}
		}
		lobbyInfoMap[user.id].race = form.data.race;
	},
	async toggleReady({ request, locals: { gameState, user } }) {
		const form = await superValidate(request, emptySchema);
		if (!form.valid) return fail(400, { form });

		if (!gameState.lobbyInfoMap[user.id].race)
			return message(form, 'Please select a race first', { status: 400 });
		gameState.lobbyInfoMap[user.id].ready = !gameState.lobbyInfoMap[user.id].ready;
	},
	async startGame({ request, locals: { gameState } }) {
		const form = await superValidate(request, z.object({}));
		const allReady = !Object.values(gameState.lobbyInfoMap).find(({ ready }) => !ready);
		if (!allReady)
			return message(form, 'Not everyone is ready. Wait until everyone is ready to start the game');

		gameState.gameInfo = {};
		for (const playerId of gameState.players) {
			const race = gameState.lobbyInfoMap[playerId].race!;
			const raceObj = raceInfoMap[race];
			gameState.gameInfo[playerId] = {
				race,
				resources: raceObj.startingResources || []
			};
		}

		throw redirect(308, `/game/${gameState.id}/game`);
	}
};

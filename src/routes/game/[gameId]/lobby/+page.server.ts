import { error, fail } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import { string, z } from "zod";

const kickUserSchema = z.object({
    playerId: z.string()
})

export async function load() {
    return {
        kickUserForm: await superValidate(kickUserSchema)
    }
}

export const actions = {
    async kickUser({ request, locals: { gameState, user } }) {
        const form = await superValidate(request, kickUserSchema);
        if (!form.valid) return fail(400, { form });
        if (user.id === form.data.playerId) return message(form, "Can't kick yourself", { status: 400 });
        gameState.players = gameState.players.filter((id) => id !== form.data.playerId);
        delete gameState.usernameMap[form.data.playerId];
    }
}
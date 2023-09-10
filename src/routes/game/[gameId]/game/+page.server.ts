import { fail } from "@sveltejs/kit"
import { superValidate } from "sveltekit-superforms/server"
import { z } from "zod"

const tradeInviteSchema = z.object({
    playerId: z.string()
})

export async function load() {
    return {
        tradeInviteForm: await superValidate(tradeInviteSchema)
    }
}

export const actions = {
    async inviteToTrade({request, locals: {gameState}}) {
        const form = await superValidate(request, tradeInviteSchema);
        if(!form.valid) return fail(400, {form});

    }
}
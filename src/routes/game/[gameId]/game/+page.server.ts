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
}
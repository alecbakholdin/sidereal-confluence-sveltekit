import { tradeProposalSchema } from "$lib/types/trade";
import { superValidate } from "sveltekit-superforms/server";

export async function load() {
    return {
        tradeProposalForm: await superValidate(tradeProposalSchema)
    }
}
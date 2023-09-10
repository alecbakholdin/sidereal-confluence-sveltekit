import { AUTH_SECRET } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import jwt from 'jsonwebtoken'

const changeUsernameSchema = z.object({
    username: z.string()
        .min(5, "Username must be at least 5 characters")
        .regex(/^[ A-Za-z0-9_-]+$/, "Username can only have letters, numbers, underscores, spaces, and hyphens")
})

export async function load({ locals }) {
    const { user } = locals;
    const usernameForm = await superValidate(changeUsernameSchema);
    usernameForm.data = {
        username: user.username
    }
    return {
        usernameForm
    }
}

export const actions = {
    async default({ request, locals, cookies }) {
        const form = await superValidate(request, changeUsernameSchema)
        if (!form.valid) return fail(400, { form });

        const newUser = {
            ...locals.user,
            username: form.data.username
        };
        cookies.set("Authorization", jwt.sign({ data: newUser }, AUTH_SECRET), { path: '/' })
    }
}
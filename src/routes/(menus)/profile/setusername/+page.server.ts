import { AUTH_SECRET } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const changeUsernameSchema = z.object({
    username: z.string()
        .min(2, "Username must be at least 2 characters")
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
    async default({ request, locals, cookies, url }) {
        const form = await superValidate(request, changeUsernameSchema)
        if (!form.valid) return fail(400, { form });

        const newUser = {
            ...locals.user,
            username: form.data.username
        };
        cookies.set("Authorization", jwt.sign({ data: newUser }, AUTH_SECRET), { path: '/', maxAge: 60 * 60 * 24 * 30 });

        let redirectUrl = url.searchParams.get('redirect');
        if (redirectUrl) {
            throw redirect(308, redirectUrl);
        }
    }
}
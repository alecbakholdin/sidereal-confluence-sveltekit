import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

export async function load({ locals: { user } }) {
	return { me: user, emptyForm: await superValidate(z.object({})) };
}

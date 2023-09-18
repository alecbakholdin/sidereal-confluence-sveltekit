import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
	throw redirect(308, url.pathname + '/trade');
}

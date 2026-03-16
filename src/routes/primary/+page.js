import { fetchItems } from '$lib/data.js';

export async function load({ fetch }) {
	const items = await fetchItems(fetch, 'Primary');
	return { items };
}

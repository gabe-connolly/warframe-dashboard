import { fetchItems } from '$lib/data.js';

export async function load({ fetch }) {
	const items = await fetchItems(fetch, 'Sentinels');
	return { items };
}

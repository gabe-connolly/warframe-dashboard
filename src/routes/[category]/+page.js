import { error } from '@sveltejs/kit';
import { itemCategories } from '$lib/categories.js';
import { fetchItems } from '$lib/data.js';

const specialRoutes = ['arcanes', 'archwing', 'mods', 'primary', 'secondary', 'sentinels'];

export async function load({ params, fetch }) {
	const category = itemCategories.find(
		(c) => c.toLowerCase() === params.category.toLowerCase()
	);

	if (!category || specialRoutes.includes(params.category.toLowerCase())) {
		throw error(404, 'Category not found');
	}

	const items = await fetchItems(fetch, category);
	return { items, category };
}

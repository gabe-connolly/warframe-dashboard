<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { itemCategories } from '$lib/categories.js';
	import FilterBar from '$lib/components/FilterBar.svelte';
	import ItemModal from '$lib/components/ItemModal.svelte';
	import '../app.css';

	let { children } = $props();

	function handleCategoryChange(e) {
		const category = e.target.value;
		if (category) {
			goto(`${base}/${category.toLowerCase()}`);
		}
	}
</script>

<FilterBar>
	<label for="category">Select an item category</label>
	<select name="category" onchange={handleCategoryChange}>
		<option value="">-- Category --</option>
		{#each itemCategories as cat}
			<option value={cat}>{cat}</option>
		{/each}
	</select>
</FilterBar>

{@render children()}

<ItemModal />

<script>
	import { filterItemsByKeyword } from '$lib/filters.js';
	import FilterBar from '$lib/components/FilterBar.svelte';
	import ItemList from '$lib/components/ItemList.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import ItemFigure from '$lib/components/ItemFigure.svelte';
	import ResultsCount from '$lib/components/ResultsCount.svelte';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';

	let { data } = $props();

	let keywordFilter = $state('');

	let filteredItems = $derived.by(() => {
		if (keywordFilter) {
			return filterItemsByKeyword(data.items, keywordFilter);
		}
		return data.items;
	});

	function resetFilters() {
		keywordFilter = '';
	}
</script>

<FilterBar>
	<input type="text" placeholder="keyword" name="keyword" value={keywordFilter} oninput={(e) => keywordFilter = e.target.value} />
	<button onclick={resetFilters}>Reset filters</button>
	<ResultsCount count={filteredItems.length} />
</FilterBar>

<ItemList>
	{#each filteredItems as item (item.uniqueName)}
		<ItemCard {item}>
			<ItemFigure imageName={item.imageName} />
			<h1>{item.name}</h1>
			{#if item.description && item.description.length}
				<p>{item.description.trim()}</p>
			{/if}
		</ItemCard>
	{/each}
</ItemList>

<script>
	import { filterItemsByProp, filterItemsByKeyword, getFilterProps } from '$lib/filters.js';
	import FilterBar from './FilterBar.svelte';
	import ItemFilter from './ItemFilter.svelte';
	import ItemList from './ItemList.svelte';
	import ItemCard from './ItemCard.svelte';
	import ItemFigure from './ItemFigure.svelte';
	import ResultsCount from './ResultsCount.svelte';

	let { items = [] } = $props();

	let keywordFilter = $state('');
	let weaponTypeFilter = $state('');
	let masteryRankFilter = $state('');
	let noiseLevelFilter = $state('');

	let typeFilterOptions = $derived(getFilterProps(items, 'type'));
	let noiseLevelFilterOptions = $derived(getFilterProps(items, 'noise'));
	let masteryRankFilterOptions = $derived(getFilterProps(items, 'masteryReq').sort((a, b) => a - b));

	let filteredItems = $derived.by(() => {
		let result = [...items];

		if (masteryRankFilter) {
			result = filterItemsByProp(result, 'masteryReq', parseInt(masteryRankFilter));
		}
		if (noiseLevelFilter) {
			result = filterItemsByProp(result, 'noise', noiseLevelFilter);
		}
		if (weaponTypeFilter) {
			result = filterItemsByProp(result, 'type', weaponTypeFilter);
		}
		if (keywordFilter) {
			result = filterItemsByKeyword(result, keywordFilter);
		}

		return result;
	});

	function resetFilters() {
		keywordFilter = '';
		weaponTypeFilter = '';
		masteryRankFilter = '';
		noiseLevelFilter = '';
	}
</script>

<FilterBar>
	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label>Filter weapons by:</label>
	<ItemFilter
		defaultOption="Weapon type"
		options={typeFilterOptions}
		value={weaponTypeFilter}
		onchange={(e) => weaponTypeFilter = e.target.value}
	/>
	<ItemFilter
		defaultOption="Noise Level"
		options={noiseLevelFilterOptions}
		value={noiseLevelFilter}
		onchange={(e) => noiseLevelFilter = e.target.value}
	/>
	<ItemFilter
		defaultOption="Mastery Rank required"
		options={masteryRankFilterOptions}
		value={masteryRankFilter}
		onchange={(e) => masteryRankFilter = e.target.value}
	/>
	<input type="text" placeholder="keyword" name="keyword" value={keywordFilter} oninput={(e) => keywordFilter = e.target.value} />
	<button onclick={resetFilters}>Reset filters</button>
	<ResultsCount count={filteredItems.length} />
</FilterBar>

<ItemList>
	{#each filteredItems as item (item.uniqueName)}
		<ItemCard>
			<ItemFigure imageName={item.imageName} />
			<h1>{item.name}</h1>
			<p>{item.description}</p>
		</ItemCard>
	{/each}
</ItemList>

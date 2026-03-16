<script>
	import { filterItemsByProp, filterItemsByKeyword, getFilterProps } from '$lib/filters.js';
	import FilterBar from '$lib/components/FilterBar.svelte';
	import ItemFilter from '$lib/components/ItemFilter.svelte';
	import ItemList from '$lib/components/ItemList.svelte';
	import ModCard from '$lib/components/ModCard.svelte';
	import ItemFigure from '$lib/components/ItemFigure.svelte';
	import FusionLevels from '$lib/components/FusionLevels.svelte';
	import ResultsCount from '$lib/components/ResultsCount.svelte';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';

	let { data } = $props();

	let keywordFilter = $state('');
	let polarityFilter = $state('');
	let rarityFilter = $state('');
	let typeFilter = $state('');

	let polarityOptions = $derived(getFilterProps(data.items, 'polarity'));
	let typeOptions = $derived(getFilterProps(data.items, 'type'));
	let rarityOptions = $derived(getFilterProps(data.items, 'rarity'));

	let filteredItems = $derived.by(() => {
		let result = [...data.items];

		const noActiveFilters = !polarityFilter && !rarityFilter && !typeFilter && !keywordFilter;
		if (noActiveFilters) {
			return result.slice(0, 99);
		}

		if (polarityFilter) {
			result = filterItemsByProp(result, 'polarity', polarityFilter);
		}
		if (rarityFilter) {
			result = filterItemsByProp(result, 'rarity', rarityFilter);
		}
		if (typeFilter) {
			result = filterItemsByProp(result, 'type', typeFilter);
		}
		if (keywordFilter) {
			result = filterItemsByKeyword(result, keywordFilter);
		}

		return result;
	});

	function resetFilters() {
		keywordFilter = '';
		polarityFilter = '';
		rarityFilter = '';
		typeFilter = '';
	}
</script>

<FilterBar>
	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label>Filter mods by:</label>
	<ItemFilter
		defaultOption="Polarity"
		options={polarityOptions}
		value={polarityFilter}
		onchange={(e) => polarityFilter = e.target.value}
	/>
	<ItemFilter
		defaultOption="Type"
		options={typeOptions}
		value={typeFilter}
		onchange={(e) => typeFilter = e.target.value}
	/>
	<ItemFilter
		defaultOption="Rarity"
		options={rarityOptions}
		value={rarityFilter}
		onchange={(e) => rarityFilter = e.target.value}
	/>
	<input type="text" placeholder="keyword" name="keyword" value={keywordFilter} oninput={(e) => keywordFilter = e.target.value} />
	<button onclick={resetFilters}>Reset filters</button>
	<ResultsCount count={filteredItems.length} />
</FilterBar>

<ItemList>
	{#each filteredItems as mod (`${mod.name}-limit-${mod.fusionLimit}`)}
		<ModCard rarity={mod.rarity}>
			<ItemFigure imageName={mod.imageName} />
			<h1>{mod.name}</h1>
			{#if mod.levelStats}
				{@const maxIdx = mod.levelStats.length - 1}
				{#if maxIdx >= 0}
					{#each mod.levelStats[maxIdx].stats as stat}
						<div class="stat">{stat}</div>
					{/each}
				{/if}
			{/if}
			<FusionLevels fusionLimit={mod.fusionLimit ?? 0} />
		</ModCard>
	{/each}
</ItemList>

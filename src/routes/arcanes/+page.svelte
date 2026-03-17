<script>
	import FilterBar from '$lib/components/FilterBar.svelte';
	import ItemList from '$lib/components/ItemList.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import ItemFigure from '$lib/components/ItemFigure.svelte';
	import ResultsCount from '$lib/components/ResultsCount.svelte';
	import ArcaneRank from '$lib/components/ArcaneRank.svelte';

	let { data } = $props();
</script>

<FilterBar>
	<ResultsCount count={data.items.length} />
</FilterBar>

<ItemList>
	{#each data.items as item (item.uniqueName)}
		{#if item.name !== 'Arcane'}
			<ItemCard>
				<ItemFigure imageName={item.imageName} />
				<main class="item-main">
					<h1>{item.name}</h1>
					<div class="item-details">
						{#if item.levelStats}
							{#each item.levelStats as stat, level}
								<ArcaneRank level={level} description={stat.stats.join('\n')} />
							{/each}
						{/if}
					</div>
				</main>
			</ItemCard>
		{/if}
	{/each}
</ItemList>

<style>
	.item-main {
		padding: 1em;
	}

	@media (min-width: 1024px) {
		.item-main {
			flex-wrap: nowrap;
		}
	}
</style>

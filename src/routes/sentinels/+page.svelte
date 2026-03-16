<script>
	import FilterBar from '$lib/components/FilterBar.svelte';
	import ItemList from '$lib/components/ItemList.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import ItemFigure from '$lib/components/ItemFigure.svelte';
	import ItemDetailCard from '$lib/components/ItemDetailCard.svelte';
	import ItemBuildComponent from '$lib/components/ItemBuildComponent.svelte';
	import ResultsCount from '$lib/components/ResultsCount.svelte';

	let { data } = $props();
</script>

<FilterBar>
	<ResultsCount count={data.items.length} />
</FilterBar>

<ItemList>
	{#each data.items as item (item.uniqueName)}
		<ItemCard>
			<ItemFigure imageName={item.imageName} />
			<h1>{item.name}</h1>
			<p>{item.description}</p>
			<p>Armor: {item.armor}</p>
			<h3>Manufacturing Requirements</h3>
			{#if item.components}
				<ItemDetailCard>
					{#each Object.entries(item.components) as [, component]}
						<ItemBuildComponent>
							<p>{component.name} x {component.itemCount}</p>
						</ItemBuildComponent>
					{/each}
				</ItemDetailCard>
			{/if}
		</ItemCard>
	{/each}
</ItemList>

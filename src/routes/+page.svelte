<script>
	import { onMount } from 'svelte';
	import { worldstate } from '$lib/worldstate.svelte.js';
	import WorldStatusCard from '$lib/components/worldstate/WorldStatusCard.svelte';
	import MissionsCard from '$lib/components/worldstate/MissionsCard.svelte';
	import FissureCard from '$lib/components/worldstate/FissureCard.svelte';
	import InvasionCard from '$lib/components/worldstate/InvasionCard.svelte';
	import NightwaveCard from '$lib/components/worldstate/NightwaveCard.svelte';
	import NewsCard from '$lib/components/worldstate/NewsCard.svelte';


	onMount(() => {
		worldstate.start();
		return () => worldstate.stop();
	});

	const data = $derived(worldstate.data);
</script>

{#if worldstate.loading}
	<div class="loading">Loading WorldState...</div>
{:else if worldstate.error}
	<div class="error">Error: {worldstate.error}</div>
{:else if data}
	<div class="worldstate-grid">
		<WorldStatusCard
			cetusCycle={data.cetusCycle}
			earthCycle={data.earthCycle}
			cambionCycle={data.cambionCycle}
			vallisCycle={data.vallisCycle}
			voidTrader={data.voidTrader}
			events={data.events ?? []}
		/>

		{#if data.sortie || data.archonHunt}
			<MissionsCard sortie={data.sortie} archonHunt={data.archonHunt} />
		{/if}

		{#if data.fissures?.length}
			<FissureCard fissures={data.fissures} />
		{/if}

		{#if data.invasions?.length}
			<InvasionCard invasions={data.invasions} />
		{/if}

		{#if data.nightwave}
			<NightwaveCard nightwave={data.nightwave} />
		{/if}

		{#if data.news?.length}
			<NewsCard news={data.news} />
		{/if}
	</div>
{/if}

<style>
	.worldstate-grid {
		display: grid;
		gap: 20px;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
	}

	.loading {
		color: #F1E9B3;
		font-size: 1.3em;
		padding: 40px;
		text-align: center;
	}

	.error {
		background: rgba(200, 50, 50, 0.2);
		border: 1px solid #c83232;
		border-radius: 6px;
		color: #ff6b6b;
		font-size: 1.1em;
		margin: 20px 0;
		padding: 20px;
	}
</style>

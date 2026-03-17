<script>
	import { formatCountdown } from '$lib/timeutils.js';
	import WorldStateSection from './WorldStateSection.svelte';

	let { sortie, archonHunt } = $props();

	let sortieCountdown = $state('');
	let archonCountdown = $state('');

	$effect(() => {
		const sExpiry = sortie?.expiry;
		const aExpiry = archonHunt?.expiry;
		function tick() {
			if (sExpiry) sortieCountdown = formatCountdown(sExpiry);
			if (aExpiry) archonCountdown = formatCountdown(aExpiry);
		}
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	});
</script>

{#if sortie || archonHunt}
<WorldStateSection title="Missions">
	{#if sortie}
		<div class="mission-block">
			<div class="block-header">
				<span class="block-label">Sortie</span>
				<span class="timer">{sortieCountdown}</span>
			</div>
			<div class="block-meta">
				<span class="boss">{sortie.boss}</span>
				<span class="faction">{sortie.faction}</span>
			</div>
			{#each sortie.variants ?? [] as variant, i}
				<div class="variant">
					<span class="variant-num">{i + 1}.</span>
					<div class="variant-info">
						<span class="variant-type">{variant.missionType}</span>
						<span class="variant-node">{variant.node}</span>
						{#if variant.modifier}
							<span class="variant-modifier">{variant.modifier}</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}

	{#if sortie && archonHunt}
		<div class="divider"></div>
	{/if}

	{#if archonHunt}
		<div class="mission-block">
			<div class="block-header">
				<span class="block-label">Archon Hunt</span>
				<span class="timer">{archonCountdown}</span>
			</div>
			<div class="block-meta">
				<span class="boss">{archonHunt.boss}</span>
			</div>
			{#each archonHunt.missions ?? [] as mission, i}
				<div class="variant">
					<span class="variant-num">{i + 1}.</span>
					<div class="variant-info">
						<span class="variant-type">{mission.type}</span>
						<span class="variant-node">{mission.node}</span>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</WorldStateSection>
{/if}

<style>
	.mission-block {
		padding: 4px 0;
	}

	.block-header {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin-bottom: 6px;
	}

	.block-label {
		color: #B5924E;
		font-size: 1.05em;
		font-weight: bold;
		letter-spacing: 0.03em;
		text-transform: uppercase;
	}

	.timer {
		color: #7F7A82;
	}

	.block-meta {
		display: flex;
		gap: 12px;
		margin-bottom: 8px;
	}

	.boss {
		color: #F1E9B3;
		font-weight: bold;
	}

	.faction {
		color: #7F7A82;
	}

	.variant {
		display: flex;
		gap: 10px;
		padding: 6px 0;
	}

	.variant:not(:last-child) {
		border-bottom: 1px solid rgba(181,146,78,0.1);
	}

	.variant-num {
		color: #B5924E;
		font-weight: bold;
	}

	.variant-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.variant-type {
		color: #F1E9B3;
	}

	.variant-node {
		color: #7F7A82;
	}

	.variant-modifier {
		color: #c97b4b;
		font-style: italic;
	}

	.divider {
		border-top: 2px solid rgba(181,146,78,0.3);
		margin: 12px 0;
	}
</style>

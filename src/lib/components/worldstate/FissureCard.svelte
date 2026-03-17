<script>
	import { formatCountdown, isExpired } from '$lib/timeutils.js';
	import WorldStateSection from './WorldStateSection.svelte';

	let { fissures = [] } = $props();

	const tierOrder = ['Lith', 'Meso', 'Neo', 'Axi', 'Requiem', 'Omnia'];

	const activeFissures = $derived(
		fissures
			.filter(f => !f.isStorm && !f.isHard && !isExpired(f.expiry))
			.sort((a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier))
	);

	const grouped = $derived(
		tierOrder.reduce((acc, tier) => {
			const items = activeFissures.filter(f => f.tier === tier);
			if (items.length) acc.push({ tier, items });
			return acc;
		}, [])
	);

	let countdowns = $state({});

	$effect(() => {
		const fissureList = activeFissures;
		function tick() {
			const next = {};
			for (const f of fissureList) {
				next[f.id] = formatCountdown(f.expiry);
			}
			countdowns = next;
		}
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	});
</script>

{#if activeFissures.length}
<WorldStateSection title="Void Fissures">
	{#each grouped as group}
		<div class="tier-group">
			<div class="tier-label">{group.tier}</div>
			{#each group.items as fissure}
				<div class="fissure-row">
					<div class="fissure-info">
						<span class="mission-type">{fissure.missionType}</span>
						<span class="node">{fissure.node}</span>
					</div>
					<span class="timer">{countdowns[fissure.id] ?? ''}</span>
				</div>
			{/each}
		</div>
	{/each}
</WorldStateSection>
{/if}

<style>
	.tier-group {
		padding: 6px 0;
	}

	.tier-group:not(:last-child) {
		border-bottom: 1px solid rgba(181,146,78,0.2);
		margin-bottom: 6px;
		padding-bottom: 10px;
	}

	.tier-label {
		color: #B5924E;
		font-weight: bold;
		letter-spacing: 0.05em;
		margin-bottom: 6px;
		text-transform: uppercase;
	}

	.fissure-row {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: 5px 0;
	}

	.fissure-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.mission-type {
		color: #F1E9B3;
	}

	.node {
		color: #7F7A82;
	}

	.timer {
		color: #7F7A82;
		flex-shrink: 0;
		margin-left: 12px;
	}
</style>

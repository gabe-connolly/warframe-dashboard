<script>
	import WorldStateSection from './WorldStateSection.svelte';

	let { invasions = [] } = $props();

	const active = $derived(invasions.filter(i => !i.completed));
</script>

{#if active.length}
<WorldStateSection title="Invasions">
	{#each active as inv}
		<div class="invasion">
			<div class="invasion-header">
				<span class="node">{inv.node}</span>
				<span class="desc">{inv.desc}</span>
			</div>
			<div class="sides">
				<div class="attacker">
					<span class="faction-name">{inv.attackingFaction}</span>
					{#if inv.attackerReward?.itemString}
						<span class="reward">{inv.attackerReward.itemString}</span>
					{/if}
				</div>
				<span class="vs">vs</span>
				<div class="defender">
					<span class="faction-name">{inv.defendingFaction}</span>
					{#if inv.defenderReward?.itemString}
						<span class="reward">{inv.defenderReward.itemString}</span>
					{/if}
				</div>
			</div>
			<div class="progress-bar">
				<div class="progress-fill" style="width: {Math.abs(inv.completion ?? 50)}%"></div>
			</div>
		</div>
	{/each}
</WorldStateSection>
{/if}

<style>
	.invasion {
		padding: 10px 0;
	}

	.invasion:not(:last-child) {
		border-bottom: 1px solid rgba(181,146,78,0.2);
	}

	.invasion-header {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin-bottom: 8px;
	}

	.node {
		color: #F1E9B3;
		font-weight: bold;
	}

	.desc {
		color: #7F7A82;
	}

	.sides {
		align-items: center;
		display: flex;
		gap: 12px;
		justify-content: space-between;
		margin-bottom: 8px;
	}

	.attacker, .defender {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.defender {
		text-align: right;
	}

	.reward {
		color: #B5924E;
	}

	.vs {
		color: #7F7A82;
	}

	.progress-bar {
		background: rgba(181,146,78,0.15);
		border-radius: 3px;
		height: 6px;
		overflow: hidden;
	}

	.progress-fill {
		background: #B5924E;
		height: 100%;
		transition: width 0.3s;
	}
</style>

<script>
	import WorldStateSection from './WorldStateSection.svelte';

	let { nightwave } = $props();

	const typeOrder = ['daily', 'weekly', 'elite weekly'];

	const grouped = $derived(() => {
		if (!nightwave?.activeChallenges?.length) return [];
		return typeOrder.reduce((acc, type) => {
			const items = nightwave.activeChallenges.filter(
				c => (c.isDaily ? 'daily' : c.isElite ? 'elite weekly' : 'weekly') === type
			);
			if (items.length) acc.push({ type, items });
			return acc;
		}, []);
	});
</script>

{#if nightwave?.activeChallenges?.length}
<WorldStateSection title="Nightwave">
	{#each grouped() as group}
		<div class="challenge-group">
			<div class="group-label">{group.type}</div>
			{#each group.items as challenge}
				<div class="challenge">
					<div class="challenge-title">{challenge.title}</div>
					<div class="challenge-desc">{challenge.desc}</div>
					<div class="challenge-standing">+{challenge.reputation?.toLocaleString() ?? '?'} standing</div>
				</div>
			{/each}
		</div>
	{/each}
</WorldStateSection>
{/if}

<style>
	.challenge-group {
		padding: 6px 0;
	}

	.challenge-group:not(:last-child) {
		border-bottom: 1px solid rgba(181,146,78,0.2);
		margin-bottom: 6px;
		padding-bottom: 10px;
	}

	.group-label {
		color: #B5924E;
		font-weight: bold;
		letter-spacing: 0.05em;
		margin-bottom: 6px;
		text-transform: uppercase;
	}

	.challenge {
		padding: 6px 0;
	}

	.challenge-title {
		color: #F1E9B3;
		font-weight: bold;
	}

	.challenge-desc {
		color: #7F7A82;
		margin-top: 2px;
	}

	.challenge-standing {
		color: #B5924E;
		margin-top: 2px;
	}
</style>

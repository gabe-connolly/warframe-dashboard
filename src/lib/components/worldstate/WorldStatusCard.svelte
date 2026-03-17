<script>
	import { formatCountdown, isExpired } from '$lib/timeutils.js';
	import WorldStateSection from './WorldStateSection.svelte';

	let { cetusCycle, earthCycle, cambionCycle, vallisCycle, voidTrader, events = [] } = $props();

	const cycles = $derived([
		{ name: 'Earth', cycle: earthCycle, states: { day: '☀️', night: '🌙' } },
		{ name: 'Cetus', cycle: cetusCycle, states: { day: '☀️', night: '🌙' } },
		{ name: 'Cambion Drift', cycle: cambionCycle, states: { fass: '🔥', vome: '❄️' } },
		{ name: 'Orb Vallis', cycle: vallisCycle, states: { warm: '🔥', cold: '❄️' } },
	]);

	const isTraderActive = $derived(voidTrader?.active ?? false);
	const activeEvents = $derived(events.filter(e => !isExpired(e.expiry)));

	let countdowns = $state({});

	$effect(() => {
		const evts = activeEvents;
		function tick() {
			const next = {};
			for (const c of cycles) {
				if (c.cycle?.expiry) next[c.name] = formatCountdown(c.cycle.expiry);
			}
			if (voidTrader) {
				const expiry = isTraderActive ? voidTrader.expiry : voidTrader.activation;
				if (expiry) next['baro'] = formatCountdown(expiry);
			}
			for (const e of evts) {
				next[`event-${e.id}`] = formatCountdown(e.expiry);
			}
			countdowns = next;
		}
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	});
</script>

<WorldStateSection title="World Status">
	{#each cycles as c}
		{#if c.cycle}
			<div class="row">
				<span class="label">{c.name}</span>
				<span class="value">
					{c.states[c.cycle.state] ?? ''} {c.cycle.state}
				</span>
				<span class="timer">{countdowns[c.name] ?? ''}</span>
			</div>
		{/if}
	{/each}

	{#if voidTrader}
		<div class="divider"></div>
		<div class="row baro-row">
			<span class="label">Baro Ki'Teer</span>
			{#if isTraderActive}
				<span class="value">{voidTrader.location}</span>
				<span class="timer">Leaves {countdowns['baro'] ?? ''}</span>
			{:else}
				<span class="value">{voidTrader.location || '???'}</span>
				<span class="timer">Arrives {countdowns['baro'] ?? ''}</span>
			{/if}
		</div>
		{#if isTraderActive && voidTrader.inventory?.length}
			<div class="inventory">
				{#each voidTrader.inventory as item}
					<div class="inv-item">
						<span class="inv-name">{item.item}</span>
						<span class="inv-cost">
							{#if item.ducats}{item.ducats} ducats{/if}
							{#if item.ducats && item.credits} + {/if}
							{#if item.credits}{item.credits.toLocaleString()} cr{/if}
						</span>
					</div>
				{/each}
			</div>
		{/if}
	{/if}

	{#if activeEvents.length}
		<div class="divider"></div>
		{#each activeEvents as event}
			<div class="event">
				<div class="event-header">
					<span class="event-desc">{event.description}</span>
					<span class="timer">{countdowns[`event-${event.id}`] ?? ''}</span>
				</div>
				{#if event.rewards?.length}
					<div class="event-rewards">
						{#each event.rewards as reward}
							<span class="reward">{reward.itemString ?? reward.asString ?? ''}</span>
						{/each}
					</div>
				{/if}
				{#if event.health != null}
					<div class="progress-bar">
						<div class="progress-fill" style="width: {event.health}%"></div>
					</div>
					<div class="progress-label">{event.health}%</div>
				{/if}
			</div>
		{/each}
	{/if}
</WorldStateSection>

<style>
	.row {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: 8px 0;
	}

	.row:not(:last-child) {
		border-bottom: 1px solid rgba(181,146,78,0.15);
	}

	.label {
		color: #F1E9B3;
		flex: 1;
		font-weight: bold;
	}

	.value {
		flex: 1;
		text-align: center;
		text-transform: capitalize;
	}

	.timer {
		color: #7F7A82;
		flex: 0 0 auto;
		min-width: 80px;
		text-align: right;
	}

	.divider {
		border-top: 2px solid rgba(181,146,78,0.3);
		margin: 8px 0;
	}

	.baro-row {
		padding: 10px 0;
	}

	.inventory {
		border-top: 1px solid rgba(181,146,78,0.15);
		max-height: 240px;
		overflow-y: auto;
		padding-top: 8px;
	}

	.inv-item {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: 5px 0;
	}

	.inv-item:not(:last-child) {
		border-bottom: 1px solid rgba(181,146,78,0.1);
	}

	.inv-name {
		color: #F8F5CB;
	}

	.inv-cost {
		color: #B5924E;
		margin-left: 12px;
		text-align: right;
	}

	.event {
		padding: 10px 0;
	}

	.event:not(:last-child) {
		border-bottom: 1px solid rgba(181,146,78,0.2);
	}

	.event-header {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin-bottom: 6px;
	}

	.event-desc {
		color: #F1E9B3;
		font-weight: bold;
	}

	.event-rewards {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-bottom: 6px;
	}

	.reward {
		background: rgba(181,146,78,0.15);
		border-radius: 3px;
		color: #B5924E;
		padding: 3px 8px;
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
	}

	.progress-label {
		color: #7F7A82;
		margin-top: 2px;
		text-align: right;
	}
</style>

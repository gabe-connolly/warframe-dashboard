<script>
	import { formatRelativeTime } from '$lib/timeutils.js';
	import WorldStateSection from './WorldStateSection.svelte';

	let { news = [] } = $props();

	const recent = $derived(
		[...news]
			.sort((a, b) => new Date(b.date) - new Date(a.date))
			.slice(0, 6)
	);

	let times = $state({});

	$effect(() => {
		const items = recent;
		function tick() {
			const next = {};
			for (const n of items) {
				next[n.id] = formatRelativeTime(n.date);
			}
			times = next;
		}
		tick();
		const id = setInterval(tick, 60_000);
		return () => clearInterval(id);
	});
</script>

{#if recent.length}
<WorldStateSection title="News">
	{#each recent as item}
		<a class="news-item" href={item.link} target="_blank" rel="noopener noreferrer">
			{#if item.imageLink}
				<img class="news-thumb" src={item.imageLink} alt="" loading="lazy" />
			{/if}
			<div class="news-info">
				<span class="news-msg">{item.message}</span>
				<span class="news-date">{times[item.id] ?? ''}</span>
			</div>
		</a>
	{/each}
</WorldStateSection>
{/if}

<style>
	.news-item {
		align-items: center;
		color: inherit;
		display: flex;
		gap: 14px;
		padding: 10px 0;
		text-decoration: none;
	}

	.news-item:not(:last-child) {
		border-bottom: 1px solid rgba(181,146,78,0.2);
	}

	.news-item:hover .news-msg {
		color: #F1E9B3;
	}

	.news-thumb {
		border-radius: 4px;
		flex-shrink: 0;
		height: 50px;
		object-fit: cover;
		width: 88px;
	}

	.news-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
	}

	.news-msg {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.news-date {
		color: #7F7A82;
	}
</style>

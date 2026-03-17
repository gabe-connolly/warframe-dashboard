<script>
	import { modal } from '$lib/modal.svelte.js';
	import { CDNBase, fetchItems } from '$lib/data.js';
	import DamageText from './DamageText.svelte';

	let usedIn = $state([]);
	let loadingUses = $state(false);

	let prevItemName = $state(null);

	$effect(() => {
		if (!modal.item) {
			usedIn = [];
			prevItemName = null;
			return;
		}

		const itemName = modal.item.name;
		if (itemName === prevItemName) return;
		prevItemName = itemName;

		// Look up what items use this as a crafting component
		loadingUses = true;
		usedIn = [];
		fetchItems(fetch, 'All').then((allItems) => {
			const uses = allItems.filter((other) =>
				other.components?.some((c) => c.name === itemName || c.uniqueName === modal.item.uniqueName)
			);
			usedIn = uses;
			loadingUses = false;
		});
	});

	function handleBackdropClick(e) {
		if (e.target === e.currentTarget) {
			modal.close();
		}
	}

	function handleKeydown(e) {
		if (e.key === 'Escape') {
			modal.close();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if modal.isOpen}
	{@const item = modal.item}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="modal-backdrop" onclick={handleBackdropClick}>
		<div class="modal-content">
			<button class="modal-close" onclick={() => modal.close()}>✕</button>

			<div class="modal-header">
				{#if item.imageName}
					<div class="modal-image" style="background-image: url('{CDNBase}{item.imageName}')"></div>
				{/if}
				<div class="modal-title">
					<h1>{item.name}</h1>
					{#if item.category}<span class="item-type">{item.category}</span>{/if}
					{#if item.type && item.type !== item.category}<span class="item-type">{item.type}</span>{/if}
				</div>
			</div>

			{#if item.description}
				<div class="modal-section">
					<DamageText text={item.description} />
				</div>
			{/if}

			{#if item.masteryReq}
				<div class="modal-section">
					<span class="stat-label">Mastery Rank:</span> {item.masteryReq}
				</div>
			{/if}

			{#if item.components?.length}
				<div class="modal-section">
					<h2>Components</h2>
					<ul class="component-list">
						{#each item.components as component}
							<li class="component-item">
								{#if component.imageName}
									<img src="{CDNBase}{component.imageName}" alt={component.name} class="component-icon" />
								{/if}
								<span class="component-name">{component.name}</span>
								<span class="component-count">x{component.itemCount}</span>
								{#if component.drops?.length}
									<ul class="drop-list">
										{#each component.drops.slice(0, 3) as drop}
											<li class="drop-item">{drop.location} ({(drop.chance * 100).toFixed(1)}%)</li>
										{/each}
										{#if component.drops.length > 3}
											<li class="drop-item">...and {component.drops.length - 3} more</li>
										{/if}
									</ul>
								{/if}
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			{#if item.abilities?.length}
				<div class="modal-section">
					<h2>Abilities</h2>
					{#each item.abilities as ability}
						<div class="ability">
							<h3>{ability.name}</h3>
							<p><DamageText text={ability.description} /></p>
						</div>
					{/each}
				</div>
			{/if}

			{#if item.levelStats?.length}
				<div class="modal-section">
					<h2>Stats by Rank</h2>
					{#each item.levelStats as stat, level}
						<div class="rank-stat">
							<span class="stat-label">Rank {level}:</span>
							{#each stat.stats as s}
								<div class="stat-line"><DamageText text={s} /></div>
							{/each}
						</div>
					{/each}
				</div>
			{/if}

			<div class="modal-section">
				<h2>Used In</h2>
				{#if loadingUses}
					<p class="muted">Loading...</p>
				{:else if usedIn.length > 0}
					<ul class="used-in-list">
						{#each usedIn as use}
							<li class="used-in-item">
								{#if use.imageName}
									<img src="{CDNBase}{use.imageName}" alt={use.name} class="component-icon" />
								{/if}
								<button class="used-in-link" onclick={() => modal.open(use)}>
									{use.name}
								</button>
								{#if use.category}<span class="muted">({use.category})</span>{/if}
							</li>
						{/each}
					</ul>
				{:else}
					<p class="muted">Not used as a component in any blueprints.</p>
				{/if}
			</div>

			{#if item.drops?.length}
				<div class="modal-section">
					<h2>Drop Locations</h2>
					<ul class="drop-list">
						{#each item.drops.slice(0, 8) as drop}
							<li class="drop-item">{drop.location} ({(drop.chance * 100).toFixed(1)}%)</li>
						{/each}
						{#if item.drops.length > 8}
							<li class="drop-item">...and {item.drops.length - 8} more</li>
						{/if}
					</ul>
				</div>
			{/if}

			{#if item.wikiaUrl}
				<div class="modal-section">
					<a href={item.wikiaUrl} target="_blank" rel="noopener noreferrer" class="wiki-link">View on Wiki ↗</a>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 2rem;
	}

	.modal-content {
		background: #1a1a2e;
		border: 1px solid #B5924E;
		border-radius: 8px;
		box-shadow: 0 0 40px rgba(181, 146, 78, 0.3);
		color: #F8F5CB;
		font-size: 1rem;
		max-width: 600px;
		width: 100%;
		max-height: 80vh;
		overflow-y: auto;
		padding: 1.5rem;
		position: relative;
	}

	.modal-close {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		background: none;
		border: 1px solid #7F7A82;
		border-radius: 4px;
		color: #F8F5CB;
		font-size: 1.2rem;
		cursor: pointer;
		padding: 0.2em 0.5em;
		line-height: 1;
	}

	.modal-close:hover {
		background: rgba(181, 146, 78, 0.2);
	}

	.modal-header {
		display: flex;
		gap: 1rem;
		align-items: center;
		margin-bottom: 1rem;
	}

	.modal-image {
		width: 120px;
		height: 120px;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		flex-shrink: 0;
		border: 1px solid #28282A;
		border-radius: 4px;
		background-color: rgba(77, 75, 84, 0.3);
	}

	.modal-title h1 {
		margin: 0;
		font-size: 1.5rem;
	}

	.item-type {
		display: inline-block;
		background: rgba(181, 146, 78, 0.15);
		border: 1px solid rgba(181, 146, 78, 0.3);
		border-radius: 3px;
		padding: 0.1em 0.5em;
		font-size: 0.9rem;
		margin-right: 0.5em;
		margin-top: 0.25em;
	}

	.modal-section {
		margin: 1rem 0;
		padding-top: 1rem;
		border-top: 1px solid #28282A;
	}

	.modal-section h2 {
		margin: 0 0 0.5rem;
		font-size: 1.2rem;
		color: #B5924E;
	}

	.component-list, .used-in-list, .drop-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.component-item, .used-in-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0;
		border-bottom: 1px solid rgba(40, 40, 42, 0.8);
		flex-wrap: wrap;
	}

	.component-icon {
		width: 32px;
		height: 32px;
		object-fit: contain;
	}

	.component-name {
		flex: 1;
	}

	.component-count {
		color: #B5924E;
		font-weight: bold;
	}

	.drop-list {
		width: 100%;
		padding-left: 2.5rem;
	}

	.drop-item {
		font-size: 0.9rem;
		color: #a0a0a0;
		padding: 0.15em 0;
	}

	.ability {
		background: #28282A;
		border-left: 3px solid #B5924E;
		border-radius: 4px;
		padding: 0.5rem 0.75rem;
		margin-bottom: 0.5rem;
	}

	.ability h3 {
		margin: 0 0 0.25rem;
		font-size: 1.05rem;
	}

	.ability p {
		margin: 0;
		font-size: 1rem;
	}

	.rank-stat {
		padding: 0.25rem 0;
		font-size: 1rem;
	}

	.stat-label {
		color: #B5924E;
		font-weight: bold;
	}

	.stat-line {
		padding-left: 1rem;
	}

	.muted {
		color: #7F7A82;
		font-size: 1rem;
	}

	.used-in-link {
		background: none;
		border: none;
		color: #F8F5CB;
		cursor: pointer;
		font: inherit;
		padding: 0;
		text-decoration: underline;
		text-decoration-color: rgba(181, 146, 78, 0.4);
	}

	.used-in-link:hover {
		color: #B5924E;
	}

	.wiki-link {
		color: #B5924E;
		text-decoration: none;
	}

	.wiki-link:hover {
		text-decoration: underline;
	}
</style>

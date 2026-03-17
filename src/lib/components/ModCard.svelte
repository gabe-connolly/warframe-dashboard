<li class="mod-card {rarity.toLowerCase()}" onclick={handleClick} role={item ? 'button' : undefined} tabindex={item ? 0 : undefined} onkeydown={handleKeydown}>
	{@render children()}
</li>

<script>
	import { modal } from '$lib/modal.svelte.js';

	let { children, rarity = 'rare', item = null } = $props();

	function handleClick() {
		if (item) modal.open(item);
	}

	function handleKeydown(e) {
		if (item && (e.key === 'Enter' || e.key === ' ')) {
			e.preventDefault();
			modal.open(item);
		}
	}
</script>

<style>
	.mod-card {
		background: #070713;
		border: 1px solid #B5924E;
		border-bottom: 10px solid #F1E9B3;
		border-radius: 5px;
		box-shadow: inset 0 0 100px rgba(199,178,110,0.3);
		color: #F8F5CB;
		flex-basis: 256px;
		margin: 10px;
		max-width: 256px;
		overflow: hidden;
		position: relative;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		cursor: pointer;
	}

	.mod-card:hover {
		box-shadow: inset 0 0 100px rgba(199,178,110,0.3), 0 0 15px rgba(181, 146, 78, 0.3);
	}

	.mod-card :global(h1) {
		padding: 0 0.5em;
	}

	.mod-card :global(.stat) {
		padding: 2px 10px;
	}

	@media only screen and (max-width: 512px) {
		.mod-card {
			flex-basis: 100%;
		}
	}

	.mod-card.common {
		border-color: #9E7A5A #9E7A5A #DBB592;
	}

	.mod-card.uncommon {
		border-color: #BABABE #BABABE #FAFAFC;
	}

	.mod-card.rare {
		border-color: #B5924E #B5924E #F1E9B3;
	}
</style>

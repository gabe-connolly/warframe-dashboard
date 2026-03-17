<li class="item-card {extraClass}" onclick={handleClick} role={item ? 'button' : undefined} tabindex={item ? 0 : undefined} onkeydown={handleKeydown}>
	{@render children()}
</li>

<script>
	import { modal } from '$lib/modal.svelte.js';

	let { class: extraClass = '', item = null, children } = $props();

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
	.item-card {
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
		cursor: pointer;
	}

	.item-card:hover {
		border-color: #F1E9B3;
		box-shadow: inset 0 0 100px rgba(199,178,110,0.3), 0 0 15px rgba(181, 146, 78, 0.3);
	}

	.item-card :global(h1) {
		padding: 0 0.5em;
	}

	.item-card :global(p) {
		padding: 1em;
	}
</style>

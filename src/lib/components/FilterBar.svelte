<section class="filter-bar">
	{@render children()}
</section>

<script>
	let { children } = $props();
</script>

<style>
	.filter-bar {
		border: 1px solid #7F7A82;
		border-left: 4px solid;
		border-radius: 4px;
		background: #28282A;
		color: #FFF;
		margin: 10px;
		padding: 1em;
	}

	.filter-bar :global(button),
	.filter-bar :global(input),
	.filter-bar :global(select) {
		border-radius: 10px;
		margin: 0 10px;
		padding: 0.5em 1em;
	}

	.filter-bar :global(button) {
		background-color: #F1E9B3;
		cursor: pointer;
	}
</style>

<div class="detail-card">
	{@render children()}
</div>

<script>
	let { children } = $props();
</script>

<style>
	.detail-card {
		border: 1px solid #7F7A82;
		border-left: 4px solid;
		border-radius: 4px;
		background: #28282A;
		margin: 0 0 1em;
		padding: 1em;
	}

	.detail-card :global(h2) {
		margin: 0;
	}
</style>

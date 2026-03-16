<div class="arcane-rank">
	<div class="rank-container">
		<div class="rank-outer">
			<div class="rank-inner">{level}</div>
		</div>
		<div class="description">{description}</div>
	</div>
</div>

<script>
	let { level, description } = $props();
</script>

<style>
	.rank-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.rank-outer {
		border: 2px solid #C7C5A8;
		height: 1.5em;
		transform: rotate(45deg);
		width: 1.5em;
		text-align: center;
	}

	.rank-inner {
		height: 1.5em;
		width: 1.5em;
		line-height: 1.5em;
		transform: rotate(-45deg);
	}

	.description {
		padding: 1em;
	}
</style>

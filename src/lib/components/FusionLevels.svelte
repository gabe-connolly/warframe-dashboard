<ul class="fusion-levels">
	{#each Array(fusionLimit) as _, i}
		<li></li>
	{/each}
</ul>

<script>
	let { fusionLimit = 0 } = $props();
</script>

<style>
	.fusion-levels {
		display: flex;
		gap: 0.5em;
		justify-content: center;
		list-style-type: none;
		flex-wrap: wrap;
		margin: 1em;
		padding: 0;
	}

	li {
		border: 1px solid #5194B6;
		background-color: #C2F2FF;
		border-radius: 50%;
		width: 8px;
		height: 8px;
	}
</style>

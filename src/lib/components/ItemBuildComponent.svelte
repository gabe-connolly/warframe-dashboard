<div class="build-component">
	{@render children()}
</div>

<script>
	let { children } = $props();
</script>

<style>
	.build-component {
		box-sizing: border-box;
		display: inline-block;
		max-width: 20%;
		padding: 1em;
	}
</style>

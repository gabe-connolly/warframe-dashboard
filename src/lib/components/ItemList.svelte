<ul class="item-list">
	{@render children()}
</ul>

<script>
	let { children } = $props();
</script>

<style>
	.item-list {
		display: flex;
		list-style-type: none;
		flex-wrap: wrap;
		justify-content: center;
		margin: 0;
		padding: 0;
	}
</style>

<figure class="styled-figure" style="background-image: url({CDNBase}{imageName})"></figure>

<script>
	import { CDNBase } from '$lib/data.js';
	let { imageName } = $props();
</script>

<style>
	.styled-figure {
		background: rgba(77, 75, 84, 0.3);
		background-size: 100%;
		background-position: center;
		background-repeat: no-repeat;
		border-bottom: 2px solid #28282A;
		width: 100%;
		height: 260px;
	}
</style>

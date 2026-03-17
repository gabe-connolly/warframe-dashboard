<section class="ws-section">
	<h3 class="ws-title">{title}</h3>
	<div class="ws-body">
		{@render children()}
	</div>
</section>

<script>
	let { title, children } = $props();
</script>

<style>
	.ws-section {
		background: #070713;
		border: 1px solid #B5924E;
		border-radius: 6px;
		box-shadow: inset 0 0 60px rgba(199,178,110,0.15);
		overflow: hidden;
	}

	.ws-title {
		background: linear-gradient(135deg, rgba(181,146,78,0.3), rgba(181,146,78,0.1));
		border-bottom: 1px solid #B5924E;
		color: #F1E9B3;
		font-size: 1.15em;
		letter-spacing: 0.05em;
		margin: 0;
		padding: 12px 18px;
		text-transform: uppercase;
	}

	.ws-body {
		color: #F8F5CB;
		font-size: 1em;
		padding: 16px 18px;
	}
</style>

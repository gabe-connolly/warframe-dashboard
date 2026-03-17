<script>
	import { damageTypes } from '$lib/damageTypes.js';

	let { text } = $props();

	function toHtml(input) {
		// Escape HTML entities first
		let safe = input
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');

		// Now replace the escaped DT tags with styled spans
		// The tag colors the next word (the damage type name)
		safe = safe.replace(/&lt;(DT_[A-Z_]+)&gt;(\w+)/g, (_, tag, word) => {
			const dt = damageTypes[tag];
			if (!dt) return word;
			return `<img class="dt-icon" src="${dt.icon}" alt="${dt.label}">`
				+ `<span style="color:${dt.color}">${word}</span>`;
		});

		// Convert literal \n and real newlines to <br>
		safe = safe.replace(/\\n|\n/g, '<br>');

		return safe;
	}

	let html = $derived(toHtml(text));
</script>

{@html html}

<style>
	:global(.dt-icon) {
		display: inline;
		height: 1em;
		width: 1em;
		vertical-align: middle;
		margin-right: 0.15em;
	}
</style>

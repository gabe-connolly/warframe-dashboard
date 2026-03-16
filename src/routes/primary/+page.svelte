<script>
	import RangedWeapons from '$lib/components/RangedWeapons.svelte';

	let { data } = $props();
</script>

<RangedWeapons items={data.items} />

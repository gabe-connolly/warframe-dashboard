<select name={name} value={value} onchange={onchange}>
	<option value="">-- {defaultOption} --</option>
	{#each options as option}
		<option value={option}>{option}</option>
	{/each}
</select>

<script>
	let { name = '', defaultOption, options, value, onchange } = $props();
</script>

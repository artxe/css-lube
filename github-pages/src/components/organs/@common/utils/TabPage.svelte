<script lang="ts">
export let classs = ""
export let index = 0

let container: HTMLDivElement
</script>

<div bind:this={container}
		class=">:not(:nth-child({index + 1}))/none {classs}">
	<slot></slot>
</div>
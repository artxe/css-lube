<script lang="ts">
export let type: "p" | "pre" = "pre"
export let isCode = false

let wrapper: HTMLElement

const copy = () => {
	navigator.clipboard.writeText(wrapper.textContent!)
		.then(() => {
			console.log('Text copied to clipboard');
		})
		.catch((error) => {
			console.error('Could not copy text: ', error);
		})
}
</script>

<div class="bg=#fff br=.5 ta=right
		@dark@bg=--cod-gray">
	{#if isCode}
	<button class="p=.5 br=.5 :hover/bg=#eee :active/bg=#ddd! @dark@:hover/bg=#333 @dark@:active/bg=#444! fs=.75" on:click={copy}>copy</button>
	<div class="m=0_.5 bd=.1_solid_#888"></div>
	{/if}
	<svelte:element this={type} bind:this={wrapper}
			class="ta=left p=1  {isCode ? "pt=0" : ""}
			_*/wb=break-all letter-spacing=.075
			"><code><slot></slot></code></svelte:element>
</div>
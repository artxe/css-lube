<script lang="ts">
import Style from "styles"
import { scroll$, rootScrollStack$ } from "parts/store"
import { onDestroy } from "svelte"
import ModalBackground from "parts/ModalBackground.svelte"
import { afterNavigate } from "$app/navigation"

let container: HTMLDivElement

const handleScroll = () => {
	$scroll$ = container.scrollTop
	const index = window.history.state["sveltekit:index"]
	$rootScrollStack$[index] = container.scrollTop
}
afterNavigate(() => {
	const index = window.history.state["sveltekit:index"]
	container.scrollTop = $rootScrollStack$[index]
})
onDestroy(() => {
	$scroll$ = 0
})
</script>

<div bind:this={container}
		class="h=100% ox=hidden c=#000
		@dark@c=--white-dd
		:where(svg)/f=#000
		@dark@:where(svg)/f=--white-dd
		{Style.scrollbar.primary}"
		on:scroll={handleScroll}>
	<ModalBackground />
	<slot></slot>
</div>
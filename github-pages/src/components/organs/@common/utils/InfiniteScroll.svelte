<script lang="ts">
import { afterUpdate, onMount } from "svelte"

export let classs = ""
export let ready: boolean
export let onlast: Function

let container: HTMLDivElement
let observer: IntersectionObserver
onMount(() => {
	observer = new IntersectionObserver(entries => {
		if (entries[0].isIntersecting) {
			observer.unobserve(entries[0].target)
			onlast()
		}
	}, { root: container ,threshold: 0 })
})

afterUpdate(() => {
	if (ready && container.lastElementChild) {
		observer.observe(container.lastElementChild)
	}
})
</script>

<div bind:this={container}
		class="o=auto
		{classs}">
	<slot></slot>
</div>
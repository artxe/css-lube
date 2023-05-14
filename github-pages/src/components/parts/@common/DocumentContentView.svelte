<script lang="ts">
import { afterNavigate } from "$app/navigation"
import { naviOpen$ } from "parts/@common/store"
import styles from "styles"
import { contentScrollStack$ } from "parts/@common/store"

let container: HTMLDivElement

const handleScroll = () => {
	const index = window.history.state["sveltekit:index"]
	$contentScrollStack$[index] = container.scrollTop
}
afterNavigate(() => {
	const index = window.history.state["sveltekit:index"]
	container.scrollTop = $contentScrollStack$[index]
})
</script>

<div bind:this={container}
		class="h=100% oy=auto
		@!md@tt=.5s
		{$naviOpen$ ? "@!md@ml=20 @!md@mr=-20" : "@!md@ml=0 @!md@mr=0"}
		{styles.scrollbar.primary}"
		on:scroll={handleScroll}>
	<div class="w=80% h=100% m=auto">
		<div class="h=2"></div>
		<slot></slot>
		<div class="h=2"></div>
	</div>
</div>
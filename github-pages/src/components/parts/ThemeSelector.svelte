<script lang="ts">
import { onMount } from "svelte"
import { theme$ } from "parts/store"
import styles from "styles"

const setTheme = (t: string) => {
	localStorage.setItem("THEME", t)
	;(window as any).instantCss()
	$theme$ = t
}
const resetTheme = () => {
	localStorage.removeItem("THEME")
	;(window as any).instantCss()
	$theme$ = ""
}
onMount(() => $theme$ = localStorage.getItem("THEME") as string)
</script>

<div class="w=6.25 h=2.5">
	<div class="relative h=2.5 top=0 o=hidden br=.25 fw=normal :hover/tt=.5s :hover/h=8.5">
		<div class="absolute flex column r=0 t=0 :hover/tt=top_.5s {$theme$ ? $theme$ === "LIGHT" ? "" : ":not(:hover)/t=-3" : ":not(:hover)/t=-6"}">
			<button class="{styles.button.themeSelector}
					{$theme$ === "LIGHT" ? "bold" : ""}"
					on:click={() => setTheme("LIGHT")}>LIGHT</button>
			<div class="h=.5"></div>
			<button class="{styles.button.themeSelector}
					{$theme$ === "DARK" ? "bold" : ""}"
					on:click={() => setTheme("DARK")}>DARK</button>
			<div class="h=.5"></div>
			<button class="{styles.button.themeSelector}
					{!$theme$ ? "bold" : ""}"
					on:click={resetTheme}>SYSTEM</button>
		</div>
	</div>

</div>
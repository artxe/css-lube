<script lang="ts">
import { naviOpen$ } from "parts/@common/store"
import { onDestroy } from "svelte"

const handleClick = () => {
	$naviOpen$ = !$naviOpen$
}
onDestroy(() => {
	$naviOpen$ = false
})
</script>

<div class="relative">
	<div class="z=1 absolute h=100% flex tt=.5s
			l={$naviOpen$ ? "17" : "2"}
			@md@none">
		<button class="relative m=auto fs=5 bold lh=1 us=none"
				on:click={handleClick}>
			<div class="absolute t=.15 b=.15 {$naviOpen$ ? "l=0 r=-.35" : "l=-.35 r=0"}"></div>
			<div class="h=.6 w=.15 br=.1 bg=#000  tt=.5s
					tf=rotate({$naviOpen$ ? "45deg" : "-45deg"})_translateY(.05em)
					tfo=bottom
					@dark@bg=#fff"></div>
			<div class="h=.6 w=.15 br=.1 bg=#000 tt=.5s
					tf=rotate({$naviOpen$ ? "-45deg" : "45deg"})_translateY(-.05em)
					tfo=top
					@dark@bg=#fff"></div>
		</button>
	</div>
</div>
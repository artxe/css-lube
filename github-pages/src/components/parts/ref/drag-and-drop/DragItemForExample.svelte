<script lang="ts">
import Dragable from "organs/@common/utils/Dragable.svelte"
import { drag$, transition$ } from "parts/ref/store"

export let list: string[]
export let transforms: number[]
export let type: "todo" | "done"
export let index: number
export let clientHeight: number
export let duration = 400
export let setDragElement: (clientX: number, clientY: number, drag: HTMLElement) => any
export let transferList: (index: number) => any
export let moveItem: (index: number) => any

const handleClick = (event: MouseEvent) => {
	alert((event.target as HTMLElement).textContent)
}
const handleDragenter = () => {
	const i = $drag$?.index
	const t = $drag$?.type
	if (i === undefined || i === index && t === type) {
		return
	}
	if (t === type) {
		transferList(index)
	} else {
		moveItem(index)
	}
}
const handleDragstart = () => {
	$drag$ = { type: type, index: index }
	$transition$ = true
}
</script>

<Dragable on:dragstart={handleDragstart}
		delay={300}
		{setDragElement}>
	<div bind:clientHeight on:click={handleClick}
			class="w=6 ol=.1_solid ta=center fs=2 cs=pointer tf=translateY({transforms[index]}px)
			{$transition$ ? "tt=" + duration + "ms" : ""}
			{$drag$?.index === index && $drag$?.type === type ? " opacity=.2 ol=.2_solid_#aaa" : ""}
			{!list[index] ? "none" : ""}"
			on:dragenter={handleDragenter}>
		{list[index]}
	</div>
	<div slot="drag"
			bind:clientHeight
			class="ta=center fs=2.5 cs=move c=#000 @dark@c=#fff">
		{list[index] + "!!"}
	</div>
</Dragable>
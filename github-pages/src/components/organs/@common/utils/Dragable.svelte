<script lang="ts">
import { createEventDispatcher } from "svelte"

export let classs = ""
export let delay = 0
export let setDragElement: (clientX: number, clientY: number, drag: HTMLElement) => any

const dispatch = createEventDispatcher()
let container: HTMLDivElement
let dragView: HTMLDivElement
let timer: NodeJS.Timer

const handleMousedown = (event: { clientX: number, clientY: number }) => {
	timer = setTimeout(() => {
		const drag = (dragView.firstChild || container).cloneNode(true) as HTMLDivElement
		drag.style.position = "absolute"
		drag.style.top = container.offsetTop + "px"
		drag.style.left = container.offsetLeft + "px"
		setDragElement(event.clientX, event.clientY, drag)
		dispatch("dragstart")
	}, delay)
}
const handleTouchstart = (event: TouchEvent) => {
	handleMousedown(event.touches[0])
}
const handleMouseup = () => {
    clearTimeout(timer);
}
const handleTouchend = () => {
    clearTimeout(timer);
}
</script>

<div bind:this={container}
		class="touch-action=none w=fit-content us=none
		{classs}"
		on:mousedown={handleMousedown}
		on:mouseup={handleMouseup}
		on:touchstart={handleTouchstart}
		on:touchend={handleTouchend}>
	<slot></slot>
</div>
<div bind:this={dragView} class="none">
	<slot name="drag"></slot>
</div>
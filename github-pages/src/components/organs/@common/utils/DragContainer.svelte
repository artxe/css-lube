<script lang="ts">
import { createEventDispatcher } from "svelte"

export let classs = ""
export let isDragging = false
export let dragElement: HTMLElement | null = null
export const setDragElement = (clientX: number, clientY: number, drag: HTMLElement) => {
	const containerRect = container.getBoundingClientRect()
	dragElement = drag
	x = clientX - containerRect.left
	y = clientY - containerRect.top
	container.appendChild(dragElement)
	isDragging = true
}

const dispatch = createEventDispatcher()
let container: HTMLElement
let terrain: HTMLElement | null
let x = 0
let y = 0
let cx = 0
let cy = 0
let requestId: number

const handleMousemove = (event: { clientX: number, clientY: number }) => {
	if (isDragging) {
		const current = getTerrain(document.elementsFromPoint(event.clientX, event.clientY))
		if (current && terrain != current) {
			if (terrain) {
				terrain.dispatchEvent(new DragEvent("dragleave"))
			}
			terrain = current as HTMLElement
			terrain.dispatchEvent(new DragEvent("dragenter"))
		}
		cx = event.clientX
		cy = event.clientY
		translate()
		dispatch("dragmove")
		scroll(Date.now())
	}
}
const handleTouchmove = (event: TouchEvent) => {
	handleMousemove(event.touches[0])
}
const handleMouseup = () => {
	if (isDragging) {
		container.removeChild(dragElement!)
		if (terrain) {
			terrain.dispatchEvent(new DragEvent("drop"))
			terrain = null
		}
		dragElement = null
		isDragging = false
		dispatch("dragend")
	}
}
const handleTouchend = () => {
	handleMouseup()
}
const getTerrain = (terrains: Element[]) => {
	const length = terrains.length
	for (let i = 0; i < length; i++) {
		if (!dragElement!.compareDocumentPosition(terrains[i])) {
			return terrains[i + 1]
		}
	}
}
const translate = () => {
	const containerRect = container.getBoundingClientRect()
	dragElement!.style.transform = `translate(${cx - x - containerRect.left}px, ${cy - y - containerRect.top}px)`
}
function scroll(time: number) {
	if (requestId) {
		return
	}
	requestId = requestAnimationFrame(() => {
		requestId = 0
		let xs = container
		for (;;) {
			if (xs === document.body) {
				break
			}
			if (xs.scrollWidth > xs.clientWidth) {
				if (xs.scrollLeft) {
					break
				} else {
					xs.scrollLeft = 1
					if (xs.scrollLeft) {
						xs.scrollLeft = 0
						break
					}
				}
			}
			xs = xs.parentElement!
		}
		let ys = container
		for (;;) {
			if (ys === document.body) {
				break
			}
			if (ys.scrollHeight > ys.clientHeight) {
				if (ys.scrollTop) {
					break
				} else {
					ys.scrollTop = 1
					if (ys.scrollTop) {
						ys.scrollTop = 0
						break
					}
				}
			}
			ys = ys.parentElement!
		}
		const dragRect = dragElement?.getBoundingClientRect()
		if (!dragRect) {
			return
		}
		const xRect = xs.getBoundingClientRect()
		const yRect = ys.getBoundingClientRect()
		if (dragRect.left >= xRect.left && dragRect.right <= xRect.right && dragRect.top >= yRect.top && dragRect.bottom <= yRect.bottom) {
			return
		}
		const now = Date.now()
		time = now - time
		if (dragRect.left < xRect.left) {
			xs.scrollBy((dragRect.left - xRect.left) * time / 30, 0)
		} else if (dragRect.right > xRect.right) {
			xs.scrollBy((dragRect.right - xRect.right) * time / 30, 0)
		}
		if (dragRect.top < yRect.top) {
			ys.scrollBy(0, (dragRect.top - yRect.top) * time / 30)
		} else if (dragRect.bottom > yRect.bottom) {
			ys.scrollBy(0, (dragRect.bottom - yRect.bottom) * time / 30)
		}
		translate()
		scroll(now)
	})
}
</script>

<svelte:body
		on:mousemove={handleMousemove}
		on:mouseup={handleMouseup}
		on:touchmove={handleTouchmove}
		on:touchend={handleTouchend} />

<div bind:this={container}
		class="relative {classs}">
	<slot></slot>
</div>
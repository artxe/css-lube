<script lang="ts">
import { onDestroy, onMount } from "svelte"

export let align: "" | "start" |"center" | "end" = ""
export let classs = ""
export let duration = 800
export const snap = (direction: number) => {
	const now = Date.now()
	cancelAnimationFrame(request)
	request = requestAnimationFrame(() => snapping(calculateSnapMove(0, direction) / duration, now, duration, 0))
}

let container: HTMLDivElement
let isScrolling = false
let isDragging = false
let startX = 0
let startTime = 0
let accumulate = 0
let request: number
let timer: NodeJS.Timer

const handleMousedown = (event: { clientX: number }) => {
	isDragging = true
	startX = event.clientX
	startTime = Date.now()
}
const handleTouchstart = (event: TouchEvent) => {
	handleMousedown(event.touches[0])
}
const handleMousemove = (event: MouseEvent) => {
	if (isDragging) {
		event.preventDefault()
		isScrolling = true
		const scroll = startX - event.clientX
		container.scrollBy(scroll, event.clientY)
		startX = event.clientX
		if (scroll < 0 && accumulate > 0 || scroll > 0 && accumulate < 0) {
			startTime = Date.now()
			accumulate = scroll
		} else {
			accumulate += scroll
		}
	}
}
const handleTouchmove = (event: TouchEvent) => {
	handleMousemove(new MouseEvent("mousemove", event.touches[0]))
}
const handleMouseup = () => {
	if (isDragging) {
		const now = Date.now()
		if (align === "") {
			const speed = accumulate / (now - startTime)
			cancelAnimationFrame(request)
			request = requestAnimationFrame(() => slipping(speed, now, duration, 0))
		} else {
			const speed = calculateSnapMove(accumulate * duration * 2 / (now - startTime), 0)
			cancelAnimationFrame(request)
			request = requestAnimationFrame(() => snapping(speed / duration, now, duration, 0))
		}
		accumulate = 0
		isDragging = false
	}
}
const handleTouchend = () => {
	handleMouseup()
}
const slipping = (speed: number, prev: number, time: number, move: number) => {
	if (!speed) return
	const curr = Date.now()
	const ms = Math.min(time, curr - prev)
	move += speed * ms * time / duration + container.scrollLeft
	container.scrollLeft = move
	move -= container.scrollLeft
	if ((time -= ms) > 0) {
		cancelAnimationFrame(request)
		request = requestAnimationFrame(() => slipping(speed, curr, time, move))
	} else {
		container.scrollLeft += move
		isScrolling = false
	}
}
const snapping = (speed: number, prev: number, time: number, move: number) => {
	if (!speed) return
	const curr = Date.now()
	const ms = Math.min(time, curr - prev)
	move += speed * ms + container.scrollLeft
	container.scrollLeft = move
	move -= container.scrollLeft
	if ((time -= ms) > 0) {
		cancelAnimationFrame(request)
		request = requestAnimationFrame(() => snapping(speed, curr, time, move))
	} else {
		container.scrollLeft += move
		isScrolling = false
	}
}
const calculateSnapMove = (offset: number, direction: number) => {
	const childElements = container.querySelectorAll(":scope>*") as NodeListOf<HTMLElement>
	const length = childElements.length
	if (length == 0) {
		return 0
	}
	let left = 0
	if (align === "" || align === "start") {
		const scrollLeft = container.scrollLeft
		for (let i = 0; ; i++) {
			if (left + childElements[i % length].offsetWidth >= scrollLeft + offset) {
				if (scrollLeft - left + offset < childElements[i % length].offsetWidth / 2) {
					if (direction < 0) {
						return left - scrollLeft - childElements[(i - 1 + length) % length].offsetWidth
					} else if (direction > 0) {
						return left - scrollLeft + childElements[i % length].offsetWidth
					} else {
						return left - scrollLeft
					}
				}
				if (direction < 0) {
					return left - scrollLeft
				} else if (direction > 0) {
					return left - scrollLeft + childElements[i % length].offsetWidth + childElements[(i + 1) % length].offsetWidth
				} else {
					return left - scrollLeft + childElements[i % length].offsetWidth
				}
			} else {
				left += childElements[i % length].offsetWidth
			}
		}
	} else if (align === "end") {
		const scrollLeft = container.scrollLeft + container.clientWidth
		for (let i = 0; ; i++) {
			if (left + childElements[i % length].offsetWidth >= scrollLeft + offset) {
				if (scrollLeft - left + offset < childElements[i % length].offsetWidth / 2) {
					if (direction < 0) {
						return left - scrollLeft - childElements[(i - 1 + length) % length].offsetWidth
					} else if (direction > 0) {
						return left - scrollLeft + childElements[i % length].offsetWidth
					} else {
						return left - scrollLeft
					}
				}
				if (direction < 0) {
					return left - scrollLeft
				} else if (direction > 0) {
					return left - scrollLeft + childElements[i % length].offsetWidth + childElements[(i + 1) % length].offsetWidth
				} else {
					return left - scrollLeft + childElements[i % length].offsetWidth
				}
			} else {
				left += childElements[i % length].offsetWidth
			}
		}
	} else {
		const scrollLeft = container.scrollLeft + container.clientWidth / 2
		for (let i = 0; ; i++) {
			if (left + childElements[i % length].offsetWidth / 2 >= scrollLeft + offset) {
				if (scrollLeft - left + offset < 0) {
					if (direction < 0) {
						return Math.floor(left - scrollLeft - childElements[(i - 1) % length].offsetWidth - childElements[(i - 2 + length) % length].offsetWidth / 2)
					} else if (direction > 0) {
						return Math.floor(left - scrollLeft + childElements[i % length].offsetWidth / 2)
					} else {
						return Math.floor(left - scrollLeft - childElements[(i - 1 + length) % length].offsetWidth / 2)
					}
				}
				if (direction < 0) {
					return Math.floor(left - scrollLeft - childElements[(i - 1 + length) % length].offsetWidth / 2)
				} else if (direction > 0) {
					return Math.floor(left - scrollLeft + childElements[i % length].offsetWidth + childElements[(i + 1) % length].offsetWidth / 2)
				} else {
					return Math.floor(left - scrollLeft + childElements[i % length].offsetWidth / 2)
				}
			} else {
				left += childElements[i % length].offsetWidth
			}
		}
	}
}
const copyChilds = (container: HTMLElement, childElements: NodeListOf<HTMLElement>) => {
	let maxChildWidth = 0
	childElements.forEach(child => {
		maxChildWidth = Math.max(maxChildWidth, child.offsetWidth)
	})
	const safeWidth = container.offsetWidth + maxChildWidth * 3
	while (container.scrollWidth < safeWidth) {
		childElements.forEach(child => {
			container.appendChild(child.cloneNode(true))
		})
	}
}
onMount(() => {
	const childElements = container.querySelectorAll(":scope>*")
	if (childElements.length == 0) {
		return
	}
	copyChilds(container, (childElements as NodeListOf<HTMLElement>))
	let first = container.firstElementChild!
	let last = container.lastElementChild!
	first.before(last)
	first = container.firstElementChild!
	last = container.lastElementChild!
	const observer = new IntersectionObserver(
		entries => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					observer.unobserve(first)
					observer.unobserve(last)
					const target = entry.target
					if (target === first) {
						target.before(last)
						container.scrollLeft += (last as HTMLElement).offsetWidth + 1
					} else {
						target.after(first)
						container.scrollLeft -= (first as HTMLElement).offsetWidth + 1
					}
					first = container.firstElementChild!
					last = container.lastElementChild!
					observer.observe(first)
					observer.observe(last)
				}
			}
		}, {
			root: container
			,threshold: 0
		})
	observer.observe(first)
	observer.observe(last)
	timer = setInterval(() => {
		const initScroll = calculateSnapMove(0, 1)
		if (!initScroll || container.scrollLeft != (container.scrollLeft += initScroll)) {
			clearTimeout(timer)
		}
	}, 50)
})
onDestroy(() => clearInterval(timer))
</script>

<svelte:window
		on:mousemove={handleMousemove}
		on:mouseup={handleMouseup}/>

<div bind:this={container}
		class="o=scroll touch-action=none
		{classs}"
		on:mousedown={handleMousedown}
		on:touchstart={handleTouchstart}
		on:touchmove={handleTouchmove}
		on:touchend={handleTouchend}>
	<slot></slot>
</div>
<script lang="ts">
import { onDestroy, onMount } from "svelte"

export let classs = ""
export let array: [ string, number ][] = []
export let longest: number
export let transition = 500

let timer: NodeJS.Timer
let index = 0
let text1 = array[0][0]
let text2 = ""
let filter = false
let class1 = "tt=0s ft=blur(0)"
let class2 = "tt=0s ft=blur(0)"
const sleep = async (ms: number) => new Promise(resolve => timer = setTimeout(resolve, ms))
const animation = async () => {
	await sleep(array[index][1] - transition)
	filter = true
	class2 = "tt=0s ft=blur(.5em)"
	await sleep(transition * 0.1)
	index = ++index % array.length
	text2 = array[index][0]
	class1 = "tt=" + transition + "ms ft=blur(.5em)"
	class2 = "tt=" + transition + "ms ft=blur(0px)"
	await sleep(transition * 0.9)
	text1 = array[index][0]
	filter = false
	class1 = "tt=0s ft=blur(0px)"
	class2 = "tt=0s ft=blur(0px)"
	animation()
}
onMount(animation)
onDestroy(() => clearTimeout(timer))
</script>

<div class="relative ta=center
		{filter ? "ft=url(#ft)" : ""}
		>span/absolute >span/w=100% >span/l=0 >span/us=none
		{classs}">
	<span class={class1}>{@html text1}</span>
	<span class={class2}>{@html text2}</span>
	<span class="static! op=0">{@html array[longest]}</span>
	<svg class="none">
		<defs>
			<filter id="ft">
				<feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0
					0 1 0 0 0
					0 0 1 0 0
					0 0 0 255 -140" />
			</filter>
		</defs>
	</svg>
</div>
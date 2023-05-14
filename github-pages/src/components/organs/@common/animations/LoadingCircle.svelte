<script lang="ts">
import { onDestroy, onMount } from "svelte"

export let classs = ""

let timer: NodeJS.Timer
let index = 0
onMount(() => timer = setInterval(() => index = ++index % 12, 90))
onDestroy(() => clearInterval(timer))
</script>

<div class="flex relative w=4 h=4 jc=center ai=center c=#000 fs=1.5
		>div/absolute;pb=3;bold
		>div>div/h=1;w=.2;br=.1;bg=#000
		@dark@>div>div/bg=--white-dd
		{classs}">
	{#each new Array(12) as n, i}<div class="tf=rotate({i * 30}deg) op={(i = index - i % 12) === 0 ? "1" : i === 1 || i === -11 ? ".75" : i === 2 || i === -10 ? ".5" : ".25"}"><div></div></div>{/each}
</div>
<script lang="ts">
import styles from "styles"
import { createEventDispatcher } from "svelte"

export let classs = ""
export let size = 10
export let list: any[]
export let page = 0
export let offset = 1
export let jump = 5

$: last = list ? Math.floor(((list.length || 0) + size - 1) / size) - 1 : 0
$: pages = Array.from({ length: last + 1 }, (v, k) => k)

const dispatch = createEventDispatcher()
let container: HTMLElement

const handleClick = (i: number) => {
	page = Math.min(Math.max(i, 0), last)
	dispatch("change", {
		index: page * size,
		size: size
	})
}
</script>

<div bind:this={container} class={classs}>
	<button class={styles.button.text}
			on:click={() => (page > 0) && handleClick(page - 1)}>{"<"}</button>
	{#each pages as v (v)}
		{#if v <= 1 || v >= last - 1 || Math.abs(page - v) <= offset}
			{#if v === 1 && v + offset + 1 < page}
			<button class={styles.button.text}
					on:click={() => handleClick(Math.max(page - jump, 1))}>...</button>
			{:else if v === last - 1 && v - offset - 1 > page}
			<button class={styles.button.text}
					on:click={() => handleClick(Math.min(page + jump, last - 1))}>...</button>
			{:else}
			<button class={v === page ? styles.button.link : styles.button.text}
					on:click={() => handleClick(v)}>{v + 1}</button>
			{/if}
		{/if}
	{/each}
	<button class={styles.button.text}
			on:click={() => (page < last) && handleClick(page + 1)}>{">"}</button>
</div>
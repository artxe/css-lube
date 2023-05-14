<script lang="ts">
import { drag$ } from "parts/ref/store"

export let moveItem: (index: number) => any

const handleDragenter = () => {
	const i = $drag$?.index
	if (i === undefined) {
		return
	}
	moveItem(0)
}
</script>

<div class="us=none w=6 ol=.1_dashed ta=center fs=2 cs=pointer"
		on:dragenter={handleDragenter}>
	Empty
</div>
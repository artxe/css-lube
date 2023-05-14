<script lang="ts">
import { onMount } from "svelte"

export let url: string

$: download = url.slice(url.lastIndexOf('/') + 1)

let href: string

onMount(() => {
	fetch(url)
		.then(response => response.blob())
		.then(blob => href = URL.createObjectURL(blob))
})
</script>

<a href={href} download={download}>
	<slot></slot>
</a>
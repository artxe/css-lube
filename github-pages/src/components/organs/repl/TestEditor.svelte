<script lang="ts">
import styles from "styles"
import type monaco from "monaco-editor/esm/vs/editor/editor.api"
import { onMount } from "svelte"
import LoadingCircle from "organs/@common/animations/LoadingCircle.svelte"

let isLoading = true
let container: HTMLDivElement
let editor: monaco.editor.IStandaloneCodeEditor
let content = `<div class="ta=center">
	<div class="fs=2 bold">
		Hello
	</div>
</div>`
onMount(async () => {
	window.MonacoEnvironment = {
		getWorkerUrl: () => "https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js"
	}
	editor = (await import('monaco-editor')).editor.create(container, {
        automaticLayout: true,
        language: "html",
		minimap: {
			enabled: false,
		},
        theme: "vs-dark",
        value: content
    })
	isLoading = false
	editor.getModel()?.onDidChangeContent(() => content = editor.getValue())
	return () => editor.dispose()
})
</script>

<div class="flex h=100% xw=100% @!sm@column">
	<div class="relative w=40% @!sm@w=100% @!sm@h=30% bd=1px_solid p=1 oy=auto {styles.scrollbar.primary}">{@html content}</div>
	<div bind:this={container} class="fg=1 fsk=1 xw=60% bg=--cod-gray pt=1 @!sm@xw=100% @!sm@xh=70%">
		{#if isLoading} 
			<div class="flex h=100% jc=center ai=center">
				<LoadingCircle />
			</div>
		{/if}
	</div>
</div>
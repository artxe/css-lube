<script>
import AppBar from "parts/AppBar.svelte"
import TestEditor from "organs/repl/TestEditor.svelte"
</script>

<svelte:head>
	<title>Test | Instant CSS</title>
</svelte:head>

<div class="h=100% xh=100% bg=--chambray-55 @dark@bg=--firefly">
	<AppBar />
	<div class="h=4"></div>
	<div class="h=calc(100%-4em)">
		<TestEditor />
	</div>
</div>
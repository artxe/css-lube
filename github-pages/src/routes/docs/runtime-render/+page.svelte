<script>
import H5 from "cells/typography/H5.svelte"
import RuntimeRenderExample from "organs/docs/runtime-render/RuntimeRenderExample.svelte"
</script>

<svelte:head>
	<title>Runtime Render Style | Instant CSS</title>
</svelte:head>

<H5>Runtime Render Style</H5>
<div class="h=1"></div>
<span>In InstantCSS, all classes each match one style and are rendered dynamically at runtime.</span><br />
<span>Most importantly, you don't have to waste time naming class or memorizing CSS library class names.</span>
<div class="h=2"></div>
<RuntimeRenderExample />
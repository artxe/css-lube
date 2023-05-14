<script>
import CodePage from "organs/@common/utils/CodePage.svelte"
import H5 from "cells/typography/H5.svelte"
import JsMap from "cells/typography/JsMap.svelte"
</script>

<svelte:head>
	<title>Shorthand Medias | Instant CSS</title>
</svelte:head>

<H5>Shorthand Medias</H5>
<div class="h=1"></div>
<span>Shorthand Medias of InstantCSS.</span><br />
<div class="h=2"></div>
<CodePage>
	<JsMap
		name="shorthandMedias"
		json={`[
	["dark","(prefers-color-scheme:dark)"],
	["sm","(min-width:640px)"],
	["md","(min-width:768px)"],
	["lg","(min-width:1024px)"],
	["xl","(min-width:1280px)"],
	["2xl","(min-width:1536px)"]
]`}/>
</CodePage>
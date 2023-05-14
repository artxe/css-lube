<script>
import CodePage from "organs/@common/utils/CodePage.svelte"
import H5 from "cells/typography/H5.svelte"
import JsMap from "cells/typography/JsMap.svelte"
</script>

<svelte:head>
	<title>Shorthand Values | Instant CSS</title>
</svelte:head>

<H5>Shorthand Values</H5>
<div class="h=1"></div>
<span>Shorthand Values of InstantCSS.</span><br />
<div class="h=2"></div>
<CodePage>
	<JsMap
		name="shorthandValues" 
		json={`[
	/* cursor */
	["not-allowed","cursor:not-allowed"],
	["pointer","cursor:pointer"],
	["wait","cursor:wait"],
	/* display */
	["block","display:block"],
	["flex","display:flex"],
	["grid","display:grid"],
	["inline","display:inline"],
	["inline-block","display:inline-block"],
	["inline-flex","display:inline-flex"],
	["none","display:none"],
	/* flex-direction */
	["column","flex-direction:column"],
	["column-reverse","flex-direction:column-reverse"],
	["row","flex-direction:row"],
	["row-reverse","flex-direction:row-reverse"],
	/* font-weight */
	["bold","font-weight:bold"],
	/* position */
	["absolute","position:absolute"],
	["fixed","position:fixed"],
	["relative","position:relative"],
	["static","position:static"],
	["sticky","position:sticky"],
	/* visibility */
	["hidden","visibility:hidden"]
]`} />
</CodePage>
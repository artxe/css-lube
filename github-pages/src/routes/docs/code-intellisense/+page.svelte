<script>
import H5 from "cells/typography/H5.svelte"
import Download from "organs/@common/utils/Download.svelte"
import SafeImg from "organs/@common/utils/SafeImg.svelte"
import styles from "styles"
</script>

<svelte:head>
	<title>Code Intellisense | Instant CSS</title>
</svelte:head>

<H5>Code Intellisense</H5>
<div class="h=1"></div>
<span>InstantCSS provides simple code intelligence in vscode extension</span><br />
<span>It's easy to see the shortand that the library provides.</span>
<div class="h=1"></div>
<div class="h=1"></div>
<Download url="https://raw.githubusercontent.com/Artxe2/instant-css/main/lib/intellisense-instant-css-0.0.2.vsix">
	<button class="bold va=bottom {styles.button.resources}">intellisense.vsix v0.0.2</button>
</Download>
<span>vscode extension</span>
<div class="h=1"></div>
<SafeImg aspectRatio={16 / 9} src="https://github.com/Artxe2/instant-css/raw/main/github-pages/static/imgs/intellisense.webp" />
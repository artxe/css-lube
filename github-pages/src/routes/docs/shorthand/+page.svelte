<script>
import { base } from "$app/paths"
import H5 from "cells/typography/H5.svelte"
import ShorthandExample from "organs/docs/shorthand/ShorthandExample.svelte"
import styles from "styles"
</script>

<svelte:head>
	<title>Shorthand | Instant CSS</title>
</svelte:head>

<H5>Shorthand</H5>
<div class="h=1"></div>
<a href="{base}/docs/shorthand-keys">
	<button class={styles.button.text}>shorthand keys</button>
</a><br />
<a href="{base}/docs/shorthand-values">
	<button class={styles.button.text}>shorthand values</button>
</a><br />
<a href="{base}/docs/shorthand-medias">
	<button class={styles.button.text}>shorthand medias</button>
</a>
<div class="h=1"></div>
<ShorthandExample />
<script>
import H5 from "cells/typography/H5.svelte"
import MediaQueryShorthandExample from "organs/docs/media-query/MediaQueryShorthandExample.svelte"
import MediaQueryExample from "organs/docs/media-query/MediaQueryExample.svelte"
import MediaQueryMultiExample from "organs/docs/media-query/MediaQueryMultiExample.svelte"
import MediaQueryNotExample from "organs/docs/media-query/MediaQueryNotExample.svelte"
</script>

<svelte:head>
	<title>Media Query | Instant CSS</title>
</svelte:head>

<H5>Media Query</H5>
<div class="h=1"></div>
<MediaQueryExample />
<div class="h=2"></div>
<MediaQueryNotExample />
<div class="h=2"></div>
<MediaQueryMultiExample />
<div class="h=2"></div>
<MediaQueryShorthandExample />
<script>
import H5 from "cells/typography/H5.svelte"
import SafeImg from "organs/@common/utils/SafeImg.svelte"
import styles from "styles"
</script>

<svelte:head>
	<title>What is Atomic Design | Instant CSS</title>
</svelte:head>

<H5>What is Atomic Design</H5>
<div class="h=1"></div>
<span>The atomic design pattern is a design method designed to mimic the structure of an atom.</span><br />
<SafeImg classs="w=80% mw=20" aspectRatio={2048 / 1353} src="https://raw.githubusercontent.com/Artxe2/instant-css/main/github-pages/static/imgs/instagram-atomic.png" />
<div class="h=.5"></div>
<a href="https://atomicdesign.bradfrost.com/table-of-contents" target="_blank">
	<button class={styles.button.text}>atomicdesign by bradfrost</button>
</a>
<div class="h=2"></div>
<span>Atomic Design has received a lot of attention because of its intuitive and consistent approach to the development idea of React.</span><br />
<a href="https://reactjs.org/docs/thinking-in-react.html" target="_blank">
	<button class={styles.button.text}>thinking-in-react</button>
</a>
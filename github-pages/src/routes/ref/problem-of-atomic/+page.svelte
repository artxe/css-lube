<script>
import H5 from "cells/typography/H5.svelte"
    import SafeImg from "organs/@common/utils/SafeImg.svelte";
</script>

<svelte:head>
	<title>Problem of Atomic | Instant CSS</title>
</svelte:head>

<H5>Problem of Atomic</H5>
<div class="h=1"></div>
<span>At first glance, atomic design, which looks like the ultimate design pattern, also faces various problems when applied to actual development.</span><br />
<div class="h=2"></div>
<SafeImg classs="w=60% mw=20" aspectRatio={511 / 384} src="https://raw.githubusercontent.com/Artxe2/instant-css/main/github-pages/static/imgs/atomic-design.png" />
<div class="h=1"></div>
<span>First of all, if you look at the basic structure of atomic design, it's unclear what the criteria for dividing "Molecules" and "Organisms" are, and most of the problems arise from this ambiguity.</span><br />
<span>In fact, in HTML, the default unit for atoms is tags such as {`<a> and <div>`}, but this is not important.</span><br />
<span>ust like making water molecules out of hydrogen and oxygen atoms, we collect a few tags to make the smallest unit of design like a button, and atomic design treats it as "Atoms."</span>
<span>The problem is that it is difficult to classify a set of "Atoms" into two levels of components: "Molecules" and "Organisms".</span>
<div class="h=2"></div>
<SafeImg classs="w=60% mw=20" aspectRatio={100 / 63} src="https://raw.githubusercontent.com/Artxe2/instant-css/main/github-pages/static/imgs/redux.png" />
<div class="h=1"></div>
<span>In addition, Atomic Design basically presupposes separating data from design, but this is not in line with modern developments using Redux and other state management tools.</span>
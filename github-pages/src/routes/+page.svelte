<script>
import AppBar from "parts/AppBar.svelte"
import HowToUse from "organs/index/HowToUse.svelte"
import ConicGridDiv from "cells/boxs/ConicGridDiv.svelte"
import HeroSection from "organs/index/HeroSection.svelte"
import WhyUseInstantCss from "organs/index/WhatisInstantCss.svelte"
</script>

<svelte:head>
	<title>Instant CSS - Near-Atomic CSS Library</title>
</svelte:head>

<AppBar />
<ConicGridDiv>
	<HeroSection />
</ConicGridDiv>
<ConicGridDiv>
	<div class="h=1"></div>
	<WhyUseInstantCss />
	<div class="h=5"></div>
	<HowToUse />
	<div class="h=5"></div>
</ConicGridDiv>
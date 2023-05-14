<script lang="ts">
import CodePage from "organs/@common/utils/CodePage.svelte"
import CarouselSlider from "organs/@common/utils/CarouselSlider.svelte"
import ComponentTabView from "organs/ref/ComponentTabView.svelte"
import { bracket, declare, func, html, keyword, name, string, type } from "ts/highlighter"
import IdeJavascript from "cells/typography/IdeJavascript.svelte"
</script>

<ComponentTabView>
	<CarouselSlider classs="flex h=3 op=.5
			::-webkit-scrollbar/none">
		<div class="w=10% h=100% bg=red ta=center">red</div>
		<div class="w=20% h=100% bg=orange ta=center">orange</div>
	</CarouselSlider>
	<div>
		<CodePage isCode>{@html
`${html("script", ` ${name("lang")}=${string("ts")}`, `
${keyword("import")} ${name("CarouselSlider")} ${keyword("from")} ${string("organs/@common/utils/CarouselSlider.svelte")}
`)}

${html("CarouselSlider", ` ${name("classs")}=${string(`flex h=3 op=.5
		::-webkit-scrollbar/none`)}`, `
	${html("div", ` ${name("class")}=${string("w=10% h=100% bg=red ta=center")}`, "red")}
	${html("div", ` ${name("class")}=${string("w=20% h=100% bg=orange ta=center")}`, "orange")}
`)}`
		}</CodePage>
	</div>
</ComponentTabView>
<script lang="ts">
import { base } from "$app/paths"
import CodePage from "organs/@common/utils/CodePage.svelte"
import { html, name, string } from "ts/highlighter"

const code = `${html("head", "", `
	${html("script", ` ${name("src")}=${string("/instant-css.js")}`, "")}
`)}
${html("body", "", `
	${html("div", ` ${name("class")}=${string("flex h=10 ai=center jc=center")}`, `
		${html("div", ` ${name("class")}=${string("flex w=fit-content bg=#fff c=#000 p=.5 br=.5 bs=0_1_1_gray")}`, `
			${html("img", ` ${name("class")}=${string("w=4 h=4 tf=rotate(-15deg)")} ${name("src")}=${string(base + "/favicon.png")} ${name("alt")}=${string("favicon")}`, false)}
			${html("div", "", `
				${html("h3", ` ${name("class")}=${string("bold fs=2 fv=small-caps")}`, "InstantCSS")}
				${html("div", ` ${name("class")}=${string("relative mt=-1.5 w=fit-content _span/ff='Times_New_Roman',Times,serif")}`, `
					${html("span", "", "easy & rapid & intuitive")}
				`)}
			`)}
		`)}
	`)}
`)}`
</script>

<CodePage>
	<div class="flex h=10 ai=center jc=center">
		<div class="flex w=fit-content bg=#fff c=#000 p=.5 br=.5 bs=0_1_1_gray">
			<img class="w=4 h=4 tf=rotate(-15deg)" src="{base}/favicon.png" alt="favicon" />
			<div>
				<h3 class="bold fs=2 fv=small-caps">InstantCSS</h3>
				<div class="relative mt=-1.5 w=fit-content _span/ff='Times_New_Roman',Times,serif">
					<span>Near-Atomic CSS Library</span>
				</div>
			</div>
		</div>
	</div>
</CodePage>
<div>
	<span>With InstantCSS, you style elements by applying pre-existing classes directly in your HTML.</span><br />
</div>
<CodePage>{@html code}</CodePage>
<script lang="ts">
import CodePage from "organs/@common/utils/CodePage.svelte"
import TypingText from "organs/@common/animations/TypingText.svelte"
import { base } from "$app/paths"
import { closeTag, comment, css, html, name, openTag, string } from "ts/highlighter"

const code1 = `
${openTag("head", "")}
	. . . . . .
	${html("script", ` ${name("src")}=${string("/instant-css.js")}`, "")}
	${comment("<!-- Automatically generated styles at runtime using MutationObserver by InstantCSS -->")}
	${openTag("style ", ` ${name("instant-css")}=${string("v0.6.11")}`)}
		. . . . . .
`
$: code2 = `		${css(".fv\\=small-caps", ["font-variant", "small-caps"])}`
$: code3 = `		${css("._span\\/ff\\=\\'Times_New_Roman\\'\\,Times\\,serif span", ["font-family", "'Times New Roman',Times,serif"])}`
$: code4 = `		${css(".tf\\=rotate\\(-15deg\\)", ["transform", "rotate(-15deg)"])}`
const code5 = `	${closeTag("style ")}
${closeTag("head")}
`
const code6 = `${html("body", "", `
	${html("div", ` ${name("class")}=${string("flex h=10 ai=center jc=center")}`, `
		${html("div", ` ${name("class")}=${string("flex w=fit-content bg=#fff c=#000 p=.5 br=.5 bs=0_1_1_gray")}`, `
			${html("img", ` ${name("class")}=${string(`w=4 h=4<span class="foldable">tf=rotate(-15deg)</span>`)} ${name("src")}=${string(base + "/favicon.png")} ${name("alt")}=${string("favicon")}`, false)} 
			${html("div", "", `
				${html("h3", ` ${name("class")}=${string(`bold fs=2<span class="foldable">fv=small-caps</span>`)}`, "InstantCSS")} 
				${html("div", ` ${name("class")}=${string(`relative mt=-1.5 w=fit-content<span class="foldable">_span/ff='Times_New_Roman',Times,serif</span>`)}`, `
					${html("span", "", "Near-Atomic CSS Library")}
				`)}
			`)}
		`)}
	`)}
`)}`
let index = -1
const handleEndtype = (i: number) => index = i
</script>

<CodePage>
	<div class="flex h=10 ai=center jc=center">
		<div class="flex w=fit-content bg=#fff c=#000 p=.5 br=.5 bs=0_1_1_gray">
			<img class="w=4 h=4{index < 2 ? "": " tt=.5s tf=rotate(-15deg)"}" src="{base}/favicon.png" alt="favicon" />
			<div>
				<h3 class="bold fs=2{index < 0 ? "": " fv=small-caps"}">InstantCSS</h3>
				<div class="relative mt=-1.5 w=fit-content{index < 1 ? "" : " _span/ff='Times_New_Roman',Times,serif"}">
					<span>Near-Atomic CSS Library</span>
				</div>
			</div>
		</div>
	</div>
</CodePage>
<div class="h=1"></div>
<CodePage>{@html code1}<span class="op={index < 0 ? "0" : "1 tt=1s_linear"}">{@html code2}</span><br /><span class="op={index < 1 ? "0" : "1 tt=1s_linear"}">{@html code3}</span><br /><span class="op={index < 2 ? "0" : "1 tt=1s_linear"}">{@html code4}</span><br />{@html code5}<TypingText classs="_.foldable:not(:empty):before/inline-block;ct='\00a0';bg=#fff @dark@_.foldable:not(:empty):before/inline-block;ct='\00a0';bg=--cod-gray" orders={[ 1, 2, 0 ]} onendtype={handleEndtype}>{@html code6}</TypingText></CodePage>
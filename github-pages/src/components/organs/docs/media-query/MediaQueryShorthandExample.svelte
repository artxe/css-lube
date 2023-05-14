<script lang="ts">
import CodePage from "organs/@common/utils/CodePage.svelte"
import { bracket, comment, css, html, keyword, name, string } from "ts/highlighter"

const code = `${comment("<!-- Media queries also provide some shorthands -->")}
${html("style", ` ${name("instant-css")}=${string("v0.6.11")}`, `
	${keyword("@media")} ${bracket("(")}${name("min-width")}:${string("640px", false)}${bracket(")")} ${keyword("and")} ${bracket("(")}${name("max-width")}:${string("767px", false)}${bracket("){")}
		${css(".\\@\\!width\\=640\\~767px\\@fs\\=10px", ["font-size", "10px"])}
	${bracket("}")}
	${keyword("@media")} ${bracket("(")}${name("min-width")}:${string("768px", false)}${bracket("){")}
		${css(".\\@md\\@fs\\=12px", ["font-size", "12px"])}
	${bracket("}")}
	${keyword("@media not")} ${bracket("(")}${name("min-width")}:${string("768px", false)}${bracket("){")}
		${css(".\\@\\!md\\@fs\\=12px", ["font-size", "12px"])}
	${bracket("}")}
	${keyword("@media")} ${bracket("(")}${name("prefers-color-scheme")}:${string("dark", false)}${bracket(")")} ${keyword("and")} ${bracket("(")}${name("min-width")}:${string("768px", false)}${bracket("){")}
		${css(".\\@\\@dark_and_md\\@fs\\=12px", ["font-size", "12px"])}
	${bracket("}")}
`)}

${html("span", ` ${name("class")}=${string("@width=640~767px@c=red")}`, "640px ~ 767px")}
${html("span", ` ${name("class")}=${string("@md@c=red")}`, "768px ~")}
${html("span", ` ${name("class")}=${string("@!md@c=red")}`, "~ 767px")}
${html("span", ` ${name("class")}=${string("@@all_and_md@c=red")}`, "all 768px ~")}
`
</script>

<CodePage>{@html code}</CodePage>
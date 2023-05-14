<script lang="ts">
import CodePage from "organs/@common/utils/CodePage.svelte"
import { bracket, comment, css, html, keyword, name, string } from "ts/highlighter"

const code = `${html("style", ` ${name("instant-css")}=${string("v0.6.11")}`, `
	${keyword("@container")} ${bracket("(")}${name("min-width")}:${string("768px", false)}${bracket("){")}
		${css(".\\@container_min-width\\=768px\\@fs\\=10px", ["font-size", "10px"])}
	${bracket("}")}
	${keyword("@media screen and")} ${bracket("(")}${name("min-width")}:${string("768px", false)}${bracket("){")}
		${css(".\\@\\@screen_and_min-width\\=768px\\@fs\\=10px", ["font-size", "10px"])}
	${bracket("}")}
`)}

${comment("<!-- The grammar that uses more complex media queries is as follows -->")}
${html("span", ` ${name("class")}=${string("@container_min-width=768px@fs=10px")}`, "container()")}
${html("span", ` ${name("class")}=${string("@@screen_and_min-width=768px@fs=10px")}`, "multi with @")}
`
</script>

<CodePage>{@html code}</CodePage>
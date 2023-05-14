<script lang="ts">
import CodePage from "organs/@common/utils/CodePage.svelte"
import { bracket, comment, css, html, keyword, name, string } from "ts/highlighter"

const code = `${html("style", ` ${name("instant-css")}=${string("v0.6.11")}`, `
	${keyword("@media not")} ${bracket("(")}${name("min-width")}:${string("768px", false)}${bracket("){")}
		${css(".\\@\\!min-width\\=768px\\@fs\\=12px", ["font-size", "12px"])}
	${bracket("}")}
`)}

${comment("<!-- Queries with a single feature can use an exclamation point (!) to apply the not logic -->")}
${html("span", ` ${name("class")}=${string("@!min-width=768px@fs=12px")}`, "if width >= 768: im 12px")}
`
</script>

<CodePage>{@html code}</CodePage>
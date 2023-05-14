<script lang="ts">
import CodePage from "organs/@common/utils/CodePage.svelte"
import { bracket, comment, css, html, keyword, name, string } from "ts/highlighter"

const code = `${html("style", ` ${name("instant-css")}=${string("v0.6.11")}`, `
	${css(".c\\=red", ["color", "red"])}
	${css(".fs\\=16px", ["font-size", "16px"])}
	${css("[class].fs\\=16px\\!", ["font-size", "16px"])}
	${comment("/* Styles with the same prefix are grouped in the same group */")}
	${keyword("@media")} ${bracket("(")}${name("min-width")}:${string("768px", false)}${bracket("){")}
		${css(".\\@min-width\\=768px\\@fs\\=12px", ["font-size", "12px"])}
		${css(".\\@min-width\\=768px\\@c\\=blue", ["color", "blue"])}
		${css(".\\@min-width\\=768px\\@\\:active\\/fs\\=12px:active", ["font-size", "1.25em"])}
	${bracket("}")}
`)}

${comment("<!-- Classes that begin with an at (@) apply media queries and use the second at to separate styles from media queries -->")}
${html("span", ` ${name("class")}=${string("c=red fs=16px @min-width=768px@fs=12px")}`, "if width >= 768: im 12px")}
${html("span", ` ${name("class")}=${string("c=red @min-width=768px@c=blue fs=16px! @min-width=768px@fs=12px")}`, "i'm blue & 16px")}
${html("span", ` ${name("class")}=${string("@min-width=768px@:active/fs=1.25")}`, "with selector")}
`
</script>

<CodePage>{@html code}</CodePage>
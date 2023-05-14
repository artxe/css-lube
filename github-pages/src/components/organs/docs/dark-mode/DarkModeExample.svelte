<script lang="ts">
import CodePage from "organs/@common/utils/CodePage.svelte"
import { bracket, comment, css, func, html, keyword, name, string } from "ts/highlighter"

const code = `${comment("<!-- In light theme, dark mode styles are disabled -->")}
${html("style", ` ${name("instant-css")}=${string("v0.6.11")}`, `
	${css(".c\\=red", ["color", "red"])}
`)}

${comment("<!-- In dark theme, dark mode styles are applied without media queries -->")}
${html("style", ` ${name("instant-css")}=${string("v0.6.11")}`, `
	${css(".c\\=red", ["color", "red"])}
		${css(".\\@dark\\@c\\=blue", ["color", "blue"])}
`)}

${comment("<!-- In system theme, the dark mode style is applied as a media query -->")}
${html("style", ` ${name("instant-css")}=${string("v0.6.11")}`, `
	${css(".c\\=red", ["color", "red"])}
	${keyword("@media")} ${bracket("(")}${name("prefers-color-scheme")}:${string("dark", false)}${bracket("){")}
		${css(".\\@dark\\@c\\=blue", ["color", "blue"])}
	${bracket("}")}
`)}

${html("span", ` ${name("class")}=${string("c=red @dark@c=blue")}`, "I'm red letters, but in dark mode, I'm blue letters")}

${html("script", "", `
	${name("localStorage")}.${func("setItem")}${bracket("(")}${string("THEME")}, ${string("LIGHT")}${bracket(")")} ${comment("// if THEME is not DARK and true, light theme is applied")}
	${name("localStorage")}.${func("setItem")}${bracket("(")}${string("THEME")}, ${string("DARK")}${bracket(")")} ${comment("// if THEME is DARK, dark theme is applied")}
	${name("localStorage")}.${func("removeItem")}${bracket("(")}${string("THEME")}${bracket(")")} ${comment("// if THEME is false, theme is follow system settings")}
	${name("window")}${bracket("[")}${string("instantCss")}${bracket("]()")} ${comment("// update style sheet")}
`)}`
</script>

<CodePage>{@html code}</CodePage>
<script>
import CodePage from "organs/@common/utils/CodePage.svelte"
import { comment, html, name, string } from "ts/highlighter"

const code = `${html("head", "", `
	. . . . . .
	${html("script", ` ${name("src")}=${string("/instant-css.min.js")}`, "")} ${comment("/* Add instant-css inside your head tag */")}
`)}
${html("body", "", `
	. . . . . .
`)}`
</script>

<CodePage>{@html code}</CodePage>
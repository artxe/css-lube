<script lang="ts">
import CodePage from "organs/@common/utils/CodePage.svelte"
import { comment, html, name, string } from "ts/highlighter"

const code = `${comment("<!-- Classes that start with special characters applied selectors and use slash (/) to distinguish between selectors and styles -->")}
${html("div", ` ${name("class")}=${string(">span.target/bgc=red _:nth-child(2n+1)/bgc=blue")}`, `
	${html("span", "", "I'm a blue background")}
	${html("span", ` ${name("class")}=${string("target")}`, "target")}
	${html("span", "", "I'm a blue background")}
	${html("span", "", "I'm no style applied")}
`)}

${comment("<!-- The pseudo class is also applied in the same way as the selector -->")}
${html("span", ` ${name("class")}=${string(":active/bgc=blue;c=red")}`, "When I activate, I become a red letters on a blue background")}`
</script>

<CodePage>{@html code}</CodePage>
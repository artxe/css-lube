<script>
import CodePage from "organs/@common/utils/CodePage.svelte"
import { comment, html, name, string } from "ts/highlighter"

const code = `. . . . . .
${html("body", ` ${name("class")}=${string("fs=12px @sm@fs=14px @md@fs=16px @lg@fs=18px @xl@fs=20px @2xl@fs=24px")}`, `
	${html("div", ` ${name("class")}=${string("h=100% ox=hidden . . .")}`, `
		. . . . . .
	`)}
	${comment("<!--<RootDiv>-->")}
`)}`
</script>

<CodePage>{@html code}</CodePage>
<script lang="ts">
import CodePage from "organs/@common/utils/CodePage.svelte"
import { comment, html, name, string } from "ts/highlighter"

const code = `${comment("<!-- For convenience, you can enter (=) instead of (:) -->")}
${html("div", ` ${name("class")}=${string("background=red")}`, "background:red")}

${comment("<!-- You can abbreviate and use properties with shorthands -->")}
${html("span", ` ${name("class")}=${string("bgc=blue")}`, "background-color:blue")}

${comment("<!-- You can abbreviate and use value too with shorthands -->")}
${html("span", ` ${name("class")}=${string("pointer")}`, "cursor:pointer")}

${comment("<!-- The default unit is applied to styles such as width and height -->")}
${html("div", ` ${name("class")}=${string("bg=blue w=10")}`, "background:blue width:10em")}

${comment("<!-- When you use minus(-) or plus(+) in the calc function, spaces are automatically added -->")}
${html("span", ` ${name("class")}=${string("fs=calc(30px-5px)")}`, "font-size:calc(30px - 5px)")}

${comment("<!-- Values starting with two hyphens automatically wrap the var function -->")}
${html("div", ` ${name("class")}=${string("bg=--chambray")}`, "background:var(--chambray)")}`
</script>

<CodePage>{@html code}</CodePage>
<script lang="ts">
import CodePage from "organs/@common/utils/CodePage.svelte"
import { comment, html, name, string } from "ts/highlighter"

const code = `${comment("<!-- By default, class names behave like inline styles -->")}
${html("span", ` ${name("class")}=${string("background-color:red color:blue")}`, "I'm white letters on a red background")}

${comment(`<!-- Because class names use spaces( ) as delimiters, values that contain spaces should use underscores(_) instead of spaces.
A colon(:) can be included in the class name, but can be replaced by an equal sign(=) depending on your preference -->`)}
${html("span", ` ${name("class")}=${string("border=1px_solid_black")}`, "I'm black line border")}

${comment("<!-- Multiple styles or other attributes are also freely applicable in basic grammar -->")}
${html("span", ` ${name("class")}=${string("color=red;font-size=calc(8px*2)!important")}`, "I'm red letters and 8 * 2px is important")}`
</script>

<CodePage>{@html code}</CodePage>
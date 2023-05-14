<script lang="ts">
import CodePage from "organs/@common/utils/CodePage.svelte"
import { color, comment, declare, escapeTag, name, string } from "ts/highlighter"

const code = `${comment("/* scroll-padding-block|scroll-margin-block|scroll-padding-inline|scroll-margin-inline|border-image-outset */")}
${declare("let")} ${name("shorthandUnitRE")} = ${color("--chestnut-rose", "--chestnut-rose", escapeTag("/(?<=(^|;|-)(background|border|bottom|column-rule|end|flex-basis|gap|grid-template-(columns|rows)|height|inset|left|margin(-[a-z]+)*|offset-distance|origin|outline|padding(-[a-z]+)*|perspective|position|radius|right|shadow|(?<!tab-)size|spacing|start|text-indent|top|vertical-align|width):([^; ]* )*?-?(\d*\.)?\d+)(?=( |;|$))/"))}${declare("g")}
${declare("let")} ${name("defaultUnit")} = ${string("em")}`
</script>

<CodePage>{@html code}</CodePage>
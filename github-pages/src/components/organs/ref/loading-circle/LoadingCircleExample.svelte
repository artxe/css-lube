<script lang="ts">
import CodePage from "organs/@common/utils/CodePage.svelte"
import ComponentTabView from "organs/ref/ComponentTabView.svelte"
import LoadingCircle from "organs/@common/animations/LoadingCircle.svelte"
import { html, keyword, name, string } from "ts/highlighter"
</script>

<ComponentTabView>
	<div class="flex ai=center w=fit-content p=1 br=1">
		<LoadingCircle />
		<div class="w=1"></div>
		<div class="fs=.75">
			<LoadingCircle />
		</div>
		<div class="w=1"></div>
		<div class="fs=.5">
			<LoadingCircle />
		</div>
		<div class="w=1"></div>
		<div class="fs=.25">
			<LoadingCircle />
		</div>
	</div>
	<CodePage isCode>{@html
`${html("script", ` ${name("lang")}=${string("ts")}`, `
${keyword("import")} ${name("LoadingCircle")} ${keyword("from")} ${string("src/instant-ui/animations/LoadingCircle.svelte")}
`)}

${html("div", ` ${name("class")}=${string("flex ai=center w=fit-content p=1 br=1")}`, `
	${html("LoadingCircle", " ", false)}
	${html("div", ` ${name("class")}=${string("w=1")}`, "")}
	${html("div", ` ${name("class")}=${string("fs=.75")}`, `
		${html("LoadingCircle", " ", false)}
	`)}
	${html("div", ` ${name("class")}=${string("w=1")}`, "")}
	${html("div", ` ${name("class")}=${string("fs=.5")}`, `
		${html("LoadingCircle", " ", false)}
	`)}
	${html("div", ` ${name("class")}=${string("w=1")}`, "")}
	${html("div", ` ${name("class")}=${string("fs=.25")}`, `
		${html("LoadingCircle", " ", false)}
	`)}
`)}`
	}</CodePage>
</ComponentTabView>
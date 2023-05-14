<script lang="ts">
import { base } from "$app/paths"
import CodePage from "organs/@common/utils/CodePage.svelte"
import { color, css, html, name, string } from "ts/highlighter"

const code = `${html("head", "", `
	${html("style", "", `
		${css(".content-container ", [`
			display`, ` flex`], [`
			height`, ` 10em`], [`
			align-items`, ` center`], [`
			justify-content`, ` center${color("#000", "#fff", ";")}
		`])}
		${css(".content-box ", [`
			display`, ` fit-content`], [`
			width`, ` 10em`], [`
			background`, ` #fff`], [`
			color`, ` #000`], [`
			padding`, ` .5em`], [`
			border-radius`, ` .5em`], [`
			box-shadow`, ` 0 1em 1em gray${color("#000", "#fff", ";")}
		`])}
		${css(".content-icon ", [`
			width`, ` 4em`], [`
			height`, ` 4em`], [`
			transform`, ` rotate(-15deg)${color("#000", "#fff", ";")}
		`])}
		${css(".content-subject ", [`
			font-weight`, ` bold`], [`
			font-size`, ` 2em`], [`
			font-variant`, ` small-caps${color("#000", "#fff", ";")}
		`])}
		${css(".content-description ", [`
			position`, ` relative`], [`
			margin-top`, ` -1.5em`], [`
			width`, ` fit-content${color("#000", "#fff", ";")}
		`])}
		${css(".content-description ", [`
			font-family`, ` 'Times New Roman', Times, serif${color("#000", "#fff", ";")}
		`])}
	`)}
`)}
${html("body", "", `
	${html("div", ` ${name("class")}=${string("content-container")}`, `
		${html("div", ` ${name("class")}=${string("content-box")}`, `
			${html("img", ` ${name("class")}=${string("content-icon")} ${name("src")}=${string("/favicon.png")} ${name("alt")}=${string("favicon")}`, false)}
			${html("div", "", `
				${html("h3", ` ${name("class")}=${string("content-subject")}`, "InstantCSS")}
				${html("div", ` ${name("class")}=${string("content-description")}`, `
					${html("span", "", "easy & rapid & intuitive")}
				`)}
			`)}
		`)}
	`)}
`)}`
</script>

<style>
	.content-container {
		display: flex;
		height: 10em;
		align-items: center;
		justify-content: center;
	}
	.content-box {
		display: flex;
		width: fit-content;
		background: #fff;
		color: #000;
		padding: .5em;
		border-radius: .5em;
		box-shadow: 0 1em 1em gray;
	}
	.content-icon {
		width: 4em;
		height: 4em;
		transform: rotate(-15deg);
	}
	.content-subject {
		font-weight: bold;
		font-size: 2em;
		font-variant: small-caps;
	}
	.content-description {
		position: relative;
		margin-top: -1.5em;
		width: fit-content;
	}
	.content-description span {
		font-family: 'Times New Roman', Times, serif
	}
</style>

<CodePage>
	<div class="content-container">
		<div class="content-box">
			<img class="content-icon" src="{base}/favicon.png" alt="favicon" />
			<div>
				<h3 class="content-subject">InstantCSS</h3>
				<div class="content-description">
					<span>Near-Atomic CSS Library</span>
				</div>
			</div>
		</div>
	</div>
</CodePage>
<div>
	<span>In the old way, whenever you needed to style the web, you had to name a class and write CSS.</span><br />
</div>
<CodePage>{@html code}</CodePage>
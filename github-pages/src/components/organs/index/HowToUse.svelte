<script lang="ts">
import H2 from "cells/typography/H2.svelte"
import CodePage from "organs/@common/utils/CodePage.svelte"
import TypingText from "organs/@common/animations/TypingText.svelte"
import { base } from "$app/paths"
import styles from "styles"
import { closeTag, comment, css, html, name, openTag, string } from "ts/highlighter"

const code1 = `
${openTag("head", "")}
	. . . . . .
	${html("script", ` ${name("src")}=${string("/instant-css.js")}`, "")}
	${comment("<!-- Automatically generated styles at runtime using MutationObserver by InstantCSS -->")}
	${openTag("style ", ` ${name("instant-css")}=${string("v0.6.11")}`)}
		. . . . . .
`
$: code2 = `		${css(".fs\\=1\\.5", ["font-size", "1.5em"])}`
$: code3 = `		${css(".ts\\=0_0_1_red", ["text-shadow", "0 0 1em red"])}`
$: code4 = `		${css(".\\:after\\/ct\\=\\'\\!\\'\\;inline-block\\;ml\\=\\.1\\;fs\\=2\\;tfo\\=center_\\.5:after", ["content", "'!'"], ["display", "inline-block"], ["margin-left", ".1em"], ["font-size", "2em"], ["transform-origin", ".5em"])}`
$: code5 = `		${css(".\\:after\\/a\\=hello_1s_infinite_linear:after", ["animation", "hello 1s infinite linear"])}`
const code6 = `	${closeTag("style ")}
${closeTag("head")}
`
const code7 = `${html("body", "", `
	. . . . . .
	${html("span", ` ${name("class")}=${string(`<span class="foldable">fs=1.5</span><span class="foldable">ts=0_0_1_red</span><span class="foldable">:after/ct='!';inline-block;ml=.1;fs=2;tfo=center_.5</span><span class="foldable">:after/a=hello_1s_infinite_linear</span>`)}`, "that's all")}
`)}`

let index = -1
let text1 = "fs=1.5"
let text2 = "ts=0_0_1_red"
let text3 = ":after/ct='!';inline-block;ml=.1;fs=2;tfo=center_.5"
let text4 = ":after/a=hello_1s_infinite_linear"
const handleEndtype = (i: number) => index = i
</script>

<style>
	@keyframes -global-hello {
		0% { transform: rotate(0deg) }
		10% { transform: rotate(-6deg) }
		20% { transform: rotate(-9deg) }
		25% { transform: rotate(-10deg) }
		30% { transform: rotate(-9deg) }
		40% { transform: rotate(-6deg) }
		60% { transform: rotate(6deg) }
		70% { transform: rotate(9deg) }
		75% { transform: rotate(10deg) }
		80% { transform: rotate(9deg) }
		90% { transform: rotate(6deg) }
		100% { transform: rotate(0deg) }
	}
</style>

<H2>How to use</H2>
<div class="@lg@flex">
	<div class="@lg@w=35%">
		<span class="relative">Install InstantCSS and add inside your head tag.</span>
		<div class="h=.5"></div>
		<div class="relative h=2">
			<div class="absolute r=50% b=50% tf=translate(50%,50%)">
				<code class="lh=0{index < 0 ? "" : " " + text1}{index < 1 ? "" : " " + text2}{index < 2 ? "" : " " + text3}{index < 3 ? "" : " " + text4}">that's all</code><br />
			</div>
		</div>
		<a href="{base}/docs/installation">
			<button class={styles.button.text}>installation</button>
		</a>
	</div>
	<div class="w=1 h=1"></div>
	<div class="w=fit-content m=auto xw=80% @lg@xw=65% @!lg@mw=50%">
		<CodePage>{@html code1}<span class="op={index < 0 ? "0" : "1 tt=1s_linear"}">{@html code2}</span><br /><span class="op={index < 1 ? "0" : "1 tt=1s_linear"}">{@html code3}</span><br /><span class="op={index < 2 ? "0" : "1 tt=1s_linear"}">{@html code4}</span><br /><span class="op={index < 3 ? "0" : "1 tt=1s_linear"}">{@html code5}</span><br />{@html code6}<TypingText classs="_.foldable:not(:empty):nth-child(n+2):before/inline-block;ct='\00a0';bg=#fff @dark@_.foldable:not(:empty):nth-child(n+2):before/inline-block;ct='\00a0';bg=--cod-gray" onendtype={handleEndtype}>{@html code7}</TypingText></CodePage>
	</div>
</div>
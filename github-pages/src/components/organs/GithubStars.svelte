<script lang="ts">
import { onMount } from "svelte"
import IGithub from "cells/svgs/i_github.svelte"

let star = 0
onMount(() => {
	fetch("https://api.github.com/repos/artxe2/instant-css")
		.then(value => value.json())
		.then(json => star = json.stargazers_count)
})
</script>

<div class="flex fs=1.25">
	<a class="bgi=linear-gradient(to_bottom,#fcfcfc_0,#eee_100%) bd=.1_solid_#d5d5d5 :hover/bdc=#ccc p=.25_.75_.25_.5 pr=.75! br=.25 bold
			:hover/bgi=linear-gradient(to_bottom,#eee,#ddd_100%)"
		href="https://github.com/artxe2/instant-css"
		target="_blank"
	>
		<IGithub classs="inline-block w=1.5 f=#333" />
		<span class="c=#333">instant-css</span>
	</a>
	<div class="w=.5"></div>
	<a class="relative bgc=#fafafa c=#333 :hover/c=#0366d6 block bd=.1_solid_#d4d4d4 p=.25_.75 pl=.5 br=.25 bold
			:before/absolute;block;ct='';t=.6;l=-.45;bd=.4_solid_transparent :before/bdl=0;bdr=.4_solid_#d4d4d4
			:after/absolute;block;ct='';t=.66;l=-.29;bd=.35_solid_transparent :after/bdl=0;bdr=.35_solid_#fafafa"
		href="https://github.com/artxe2/instant-css/stargazers"
		target="_blank"
	>{star}</a>
</div>
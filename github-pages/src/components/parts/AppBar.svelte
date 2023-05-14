<script lang="ts">
import { base } from "$app/paths"
import { scroll$ } from "parts/store"
import MorphingText from "organs/@common/animations/MorphingText.svelte"
import AppBarMenu from "parts/AppBarMenu.svelte"
</script>

<div class="z=10 fixed flex ai=center w=100% h=4 tt=background-color_.5s
		bg=--chambray-22 bs=0_.5_.5_--chambray-55
		{$scroll$ ? "op=.6 :hover/op=1" : ""}">
	<div class="w=1"></div>
	<a href="{base}/">
		<button>
			<code class="fs=2 >div/ta=left _span/bold @lg@fs=2.5 c=#000 @dark@c=#fff
					{$scroll$ ? "op=.6" : "op=1"}">
				<MorphingText
					array={[
						[ `<span class="c=red">O</span>n-<span class="c=red">D</span>emand`, 1500 ],
						[ `<span class="c=red">U</span>tility-<span class="c=red">F</span>irst`, 1500 ],
						[ `<span class="c=red">N</span>ear-<span class="c=red">A</span>tomic`, 1500 ],
						[ `<span class="fv=small-caps">InstantCSS</span>`, 2500 ]
					]}
					longest={2}
					transition={500}
				/>
			</code>
		</button>
	</a>
	<div class="fg=1"></div>
	<AppBarMenu />
</div>
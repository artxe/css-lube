<script>
import TabPage from "organs/@common/utils/TabPage.svelte"

let index = 0
</script>

<div class="bd=.5_solid_--chambray-aa br=1.5 p=1">
	<div>
		<button class="fs=1.5 p=.5 {index !== 0 ? "op=.5" : ""}"
				on:click={() => index = 0}>result</button>
		<button class="fs=1.5 p=.5 {index !== 1 ? "op=.5" : ""}"
				on:click={() => index = 1}>code</button>
	</div>
	<TabPage classs="" 
			{index}>
		<slot></slot>
	</TabPage>
</div>
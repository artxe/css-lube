<script>
import AppBar from "parts/AppBar.svelte"
import SideNavigation from "parts/@common/SideNavigation.svelte"
import NaviOpenButton from "parts/@common/NaviOpenButton.svelte"
import DocumentContentView from "parts/@common/DocumentContentView.svelte"
</script>

<div class="bg=--chambray-22 @dark@bg=--firefly h=100% xw=100%">
	<AppBar />
	<div class="h=4"></div>
	<div class="flex row h=calc(100%-4em)">
		<NaviOpenButton />
		<SideNavigation />
		<div class="fg=1 fsk=1">
			<DocumentContentView>
				<slot></slot>
			</DocumentContentView>
		</div>
	</div>
</div>
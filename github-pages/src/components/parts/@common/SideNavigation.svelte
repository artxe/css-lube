<script lang="ts">
import styles from "styles"
import { base } from "$app/paths"
import { page } from "$app/stores"
import NavigationSection from "organs/docs/NavigationSection.svelte"
import { naviOpen$ } from "parts/@common/store"

const useActive = (e: HTMLAnchorElement) => {
	page.subscribe(v => {
		let active = (location.origin + v.url.pathname).startsWith(e.href)
		e.classList.toggle("bold", active)
		e.classList.toggle("c=--chambray", active)
		e.classList.toggle("@dark@c=--havelock-blue", active)
	})
}
</script>

<div class="relative">
	<div class="h=100% bg=#fff bdr=1px_solid_--alto-55 w=20 ml=0
			@!md@absolute @!md@tt=margin-left_.5s
			{$naviOpen$ ? "" : "@!md@ml=-20"}
			@dark@bg=--firefly">
		<div class="pl=1.5 h=100% oy=auto {styles.scrollbar.primary}">
			<div class="h=2"></div>
			<ul>
				<li>
					<a href="{base}/docs" use:useActive>
						<button class=":hover/c=--chambray @dark@:hover/c=--havelock-blue">Documentation</button>
					</a>
				</li>
				<li>
					<a href="{base}/ref" use:useActive>
						<button class=":hover/c=--chambray @dark@:hover/c=--havelock-blue">Reference</button>
					</a>
				</li>
				{#if $page.url.pathname.startsWith(base + "/docs")}
				<NavigationSection
					title="Getting Started"
					list={[
						{ href: base + "/docs/installation", text: "Installation" },
						{ href: base + "/docs/code-intellisense", text: "Code Intellisense" }
					]}
				/>
				<NavigationSection
					title="Core Concepts"
					list={[
						{ href: base + "/docs/utility-first", text: "Utility-First Fundamentals" },
						{ href: base + "/docs/runtime-render", text: "Runtime Render Style" },
						{ href: base + "/docs/basic", text: "Basic" },
						{ href: base + "/docs/shorthand", text: "Shorthand" },
						{ href: base + "/docs/selector", text: "Selector & Pseudo Class" },
						{ href: base + "/docs/priority", text: "Priority" },
						{ href: base + "/docs/media-query", text: "Media Query" },
						{ href: base + "/docs/dark-mode", text: "Dark mode" }
					]}
				/>
				<NavigationSection
					title="Customizing"
					list={[
						{ href: base + "/docs/css-reset", text: "CSS Reset" },
						{ href: base + "/docs/shorthand-keys", text: "Shorthand Keys" },
						{ href: base + "/docs/shorthand-values", text: "Shorthand Values" },
						{ href: base + "/docs/shorthand-medias", text: "Shorthand Medias" },
						{ href: base + "/docs/default-unit", text: "Default Unit" }
					]}
				/>
				{:else if $page.url.pathname.startsWith(base + "/ref")}
				<NavigationSection
					title="Atomic Design"
					list={[
						{ href: base + "/ref/what-is-atomic", text: "What is Atomic Design" },
						{ href: base + "/ref/problem-of-atomic", text: "Problem of Atomic" },
						{ href: base + "/ref/atomic-for-instant", text: "Atomic for Instant CSS" }
					]}
				/>
				<NavigationSection
					title="Animations"
					list={[
						{ href: base + "/ref/loading-circle", text: "Loading Circle" },
						{ href: base + "/ref/text-animation", text: "Text Animation" }
					]}
				/>
				<NavigationSection
					title="Utils"
					list={[
						{ href: base + "/ref/carousel-slider", text: "Carousel Slider" },
						{ href: base + "/ref/drag-and-drop", text: "Drag and Drop" },
						{ href: base + "/ref/infinite-scroll", text: "Infinite Scroll" },
						{ href: base + "/ref/pagination", text: "Pagination" }
					]}
				/>
				{/if}
			</ul>
			<div class="h=2"></div>
		</div>
	</div>
</div>
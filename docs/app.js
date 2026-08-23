const EXAMPLES = Object.freeze({
	profile: `<main class="mih=100% flex ai=center jc=center p=32 bg=#eef1f8 ff=Inter,ui-sans-serif,system-ui,sans-serif @max-width=460px@p=18 @dark@bg=#0f1015">
	<article class="w=380 maw=100% bg=white br=28 p=30 c=#181922 bsd=0_24_70_rgba(34,38,67,.16) tr=transform_.2s_ease,box-shadow_.2s_ease :hover/tf=translateY(-4px);bsd=0_30_80_rgba(34,38,67,.2) @dark@bg=#171821;c=#f7f7fb">
		<header class="flex ai=center g=16">
			<div class="w=64 h=64 br=20 flex ai=center jc=center bg=linear-gradient(135deg,#7c6cff,#b56cff) c=white fs=21 fw=800 bsd=0_10_28_rgba(124,108,255,.34)">CC</div>
			<div class="fg=1">
				<p class="mb=4 c=#7c6cff fs=12 fw=700 ls=.08em tt=uppercase">Creator spotlight</p>
				<h1 class="fs=22 fw=800 ls=-.025em">Mina Park</h1>
				<p class="mt=3 c=#747785 fs=14 @dark@c=#a8a9b3">Interface designer · Seoul</p>
			</div>
		</header>

		<p class="mt=24 lh=1.7 c=#565966 fs=14 @dark@c=#c0c1ca">Building playful interfaces with less ceremony and more character.</p>

		<div class="flex g=9 mt=24">
			<a class="fg=1 ta=center p=11 br=12 bg=#7c6cff c=white fs=13 fw=700 tr=transform_.18s_ease,background_.18s_ease :hover/bg=#6959ee;tf=translateY(-1px)" href="#follow">Follow</a>
			<a class="p=11_15 br=12 bg=#f0efff c=#6154d8 fs=13 fw=700 :hover/bg=#e7e4ff @dark@bg=#292638;c=#bcb5ff" href="#message">Message</a>
		</div>
	</article>
</main>`,

	responsive: `<main class="mih=100% p=40 bg=#f6f7fb ff=Inter,ui-sans-serif,system-ui,sans-serif @max-width=560px@p=18 @dark@bg=#0f1015">
	<div class="maw=980 m=0_auto">
		<header class="mb=26">
			<p class="mb=7 c=#7064e9 fs=12 fw=800 ls=.1em tt=uppercase">Responsive by class</p>
			<h1 class="c=#181922 fs=32 fw=800 ls=-.04em @max-width=560px@fs=25 @dark@c=#f7f7fb">One source, every viewport.</h1>
			<p class="mt=8 c=#747784 fs=14 lh=1.65 @dark@c=#a8a9b3">One column, two from 640px, three from 768px. Drag the divider: the grid follows the preview width.</p>
		</header>

		<section class="grid g=16 gtc=1fr @sm@gtc=repeat(2,1fr) @md@gtc=repeat(3,1fr)">
			<article class="p=22 bg=white br=18 bd=1_solid_#e8e9f0 tr=transform_.2s_ease,border-color_.2s_ease :hover/tf=translateY(-3px);bdc=#b9b1ff @dark@bg=#171821;bdc=#2a2b36">
				<span class="flex ai=center jc=center w=38 h=38 mb=28 br=11 bg=#edeaff c=#6c5ce7 fs=17 fw=800">01</span>
				<h2 class="mb=8 c=#20212a fs=17 fw=700 @dark@c=#f1f1f4">No build step</h2>
				<p class="c=#747784 fs=13 lh=1.65 @dark@c=#a8a9b3">Write the CSS you already know directly in class names.</p>
			</article>

			<article class="p=22 bg=white br=18 bd=1_solid_#e8e9f0 tr=transform_.2s_ease,border-color_.2s_ease :hover/tf=translateY(-3px);bdc=#9edec4 @dark@bg=#171821;bdc=#2a2b36">
				<span class="flex ai=center jc=center w=38 h=38 mb=28 br=11 bg=#e5f8f0 c=#26956a fs=17 fw=800">02</span>
				<h2 class="mb=8 c=#20212a fs=17 fw=700 @dark@c=#f1f1f4">Tiny runtime</h2>
				<p class="c=#747784 fs=13 lh=1.65 @dark@c=#a8a9b3">Classes are discovered and compiled while your DOM changes.</p>
			</article>

			<article class="p=22 bg=white br=18 bd=1_solid_#e8e9f0 tr=transform_.2s_ease,border-color_.2s_ease :hover/tf=translateY(-3px);bdc=#ffc2a7 @dark@bg=#171821;bdc=#2a2b36">
				<span class="flex ai=center jc=center w=38 h=38 mb=28 br=11 bg=#fff0e9 c=#d66c3c fs=17 fw=800">03</span>
				<h2 class="mb=8 c=#20212a fs=17 fw=700 @dark@c=#f1f1f4">Native syntax</h2>
				<p class="c=#747784 fs=13 lh=1.65 @dark@c=#a8a9b3">Selectors, media queries, variables and calc are all at hand.</p>
			</article>
		</section>
	</div>
</main>`,

	selectors: `<main class="mih=100% flex ai=center jc=center p=28 bg=#15151b ff=Inter,ui-sans-serif,system-ui,sans-serif">
	<section class="w=560 maw=100% p=32 br=24 bg=#1e1f27 bd=1_solid_#30313d c=#f5f5f7
		_code/ff=ui-monospace,Menlo,Consolas,monospace;fs=11;c=#9fa1ad">
		<p class="mb=8 c=#9c93ff fs=12 fw=800 ls=.1em tt=uppercase">Selector playground</p>
		<h1 class="mb=12 fs=28 fw=800 ls=-.035em">Hover the rows.</h1>
		<p class="mb=28 c=#9fa1ad fs=14 lh=1.65">Everything below is styled from its class attribute. Each row names the tokens doing the work.</p>

		<div class="grid g=10">
			<a class="flex ai=center g=12 p=14_16 br=13 bg=#272832 c=#f5f5f7 tr=background_.18s_ease,transform_.18s_ease
				:hover/bg=#302e48;tf=translateX(4px)
				>span:last-child/ml=auto;c=#8f88e8;tr=transform_.18s_ease
				:hover>span:last-child/tf=translateX(3px)" href="#selectors">
				<span class="flex ai=center jc=center w=34 h=34 br=10 bg=#3b3760 c=#c9c4ff fw=800">S</span>
				<span class="miw=0 fsk=1">
					<strong class="d=block fs=14">Scoped selectors</strong>
					<code>:hover/ >span:last-child/ :hover>span:last-child/ _code/</code>
				</span>
				<span>→</span>
			</a>

			<a class="flex ai=center g=12 p=14_16 br=13 bg=#272832 c=#f5f5f7 tr=background_.18s_ease,transform_.18s_ease
				@hover@:hover/bg=#293d38;tf=translateX(4px)" href="#media">
				<span class="flex ai=center jc=center w=34 h=34 br=10 bg=#29463d c=#91dfc2 fw=800">@</span>
				<span class="miw=0 fsk=1">
					<strong class="d=block fs=14">Media conditions</strong>
					<code>@hover@:hover/ · @sm@none · none @sm@d=inline</code>
				</span>
				<span class="ml=auto p=3_9 br=999 bg=#29463d c=#91dfc2 fs=11 fw=700 ws=nowrap"><span class="@sm@none">under 640px</span><span class="none @sm@d=inline">640px and up</span></span>
			</a>

			<a class="flex ai=center g=12 p=14_16 br=13 bg=#272832 c=#f5f5f7 tr=background_.18s_ease,transform_.18s_ease
				:hover/bg=#46342d;tf=translateX(4px)
				>span:last-child/ml=auto;c=#e6a083;tr=transform_.18s_ease
				:hover>span:last-child/tf=translateX(3px)" href="#priority">
				<span class="flex ai=center jc=center w=34 h=34 br=10 bg=#533b31!! bg=red! c=#ffc0a5 fw=800">!</span>
				<span class="miw=0 fsk=1">
					<strong class="d=block fs=14">Stackable priority</strong>
					<code>bg=#533b31!! bg=red! · two ! beat one, so red never shows</code>
				</span>
				<span>→</span>
			</a>
		</div>
	</section>
</main>`,

	grammar: `<main class="mih=100% p=32 bg=#f6f7fb c=#181922 ff=Inter,ui-sans-serif,system-ui,sans-serif
	_dl/grid;gtc=max-content_minmax(0,1fr);g=14_22;ai=center;mt=26
	_dt/ff=ui-monospace,Menlo,Consolas,monospace;fs=12;c=#6154d8;ws=nowrap
	_dd/fs=14;lh=1.5
	@max-width=560px@p=18
	@max-width=560px@_dl/gtc=1fr;g=6
	@max-width=560px@_dt/ws=normal
	@max-width=560px@_dd/mb=10
	@dark@bg=#0f1015;c=#f1f1f4
	@dark@_dt/c=#bcb5ff">
	<h1 class="fs=26 fw=800 ls=-.03em">Grammar tour</h1>
	<p class="mt=6 c=#565966 fs=14 lh=1.6 @dark@c=#c0c1ca">Each row is styled by the class on its left. Open the CSS tab to read what it compiled to.</p>

	<dl>
		<dt>w=160 h=10 br=999 bg=#7c6cff</dt>
		<dd><span class="d=block w=160 h=10 br=999 bg=#7c6cff"></span></dd>

		<dt>tab-size=~4</dt>
		<dd><pre class="m=0 tab-size=~4 ff=ui-monospace,Menlo,Consolas,monospace fs=13">if (ok) {
	return 4 // one tab, four columns wide
}</pre></dd>

		<dt>::before/ct='hero\\_bg.png?v\\=2'</dt>
		<dd><span class="::before/ct='hero\\_bg.png?v\\=2';ff=ui-monospace,Menlo,Consolas,monospace;fs=13"></span> escaped _ and = stay literal</dd>

		<dt>--accent=#59d499 c=--accent bd=2_solid_--accent</dt>
		<dd><span class="--accent=#59d499 c=--accent bd=2_solid_--accent d=inline-block p=4_10 br=8 fw=700">var() is written for you</span></dd>

		<dt>c=#7c6cff! c=red</dt>
		<dd><span class="c=#7c6cff! c=red fw=700">! beats the later rule, so this is never red</span></dd>

		<dt>>b/c=#d66c3c</dt>
		<dd><span class=">b/c=#d66c3c">the <b>bold child</b> is styled from its parent</span></dd>

		<dt>@sm@none · none @sm@d=inline</dt>
		<dd><span class="@sm@none">the preview is narrower than 640px</span><span class="none @sm@d=inline">the preview is 640px or wider</span></dd>

		<dt>@@supports_display=grid@c=#59d499</dt>
		<dd><span class="@@supports_display=grid@c=#59d499 fw=700">a raw at-rule, and key=value becomes (display: grid)</span></dd>

		<dt>@dark@c=#ffd166</dt>
		<dd><span class="@dark@c=#ffd166 fw=700">gold in dark mode. Toggle the preview theme in the top bar.</span></dd>

		<dt>flex ai=center g=8</dt>
		<dd><span class="flex ai=center g=8 _i/w=14;h=14;br=4;bg=#7c6cff"><i></i><i></i><i></i>value shorthands need no = at all</span></dd>
	</dl>
</main>`
})

const STORAGE = Object.freeze({
	source: "click-css-playground:source:v1",
	splitHorizontal: "click-css-playground:split-horizontal:v1",
	splitVertical: "click-css-playground:split-vertical:v1",
	theme: "click-css-playground:theme:v1"
})

// "" follows the OS setting; the other two are what click-css reads from localStorage.THEME.
const THEMES = Object.freeze([ "", "LIGHT", "DARK" ])
const THEME_LABELS = Object.freeze({ "": "System", LIGHT: "Light", DARK: "Dark" })
const RUNTIME_URL = new URL("./min.js", document.baseURI).href
const RENDER_TIMEOUT = 5000
const LOADER_DELAY = 300

const stackedLayout = window.matchMedia("(max-width: 820px)")

const editor = document.querySelector("#editor")
const lineNumbers = document.querySelector("#line-numbers")
const cursorPosition = document.querySelector("#cursor-position")
const exampleSelect = document.querySelector("#example-select")
const previewFrames = [ ...document.querySelectorAll(".preview-frame") ]
const previewLoader = document.querySelector("#preview-loader")
const cssOutput = document.querySelector("#css-output")
const cssSize = document.querySelector("#css-size")
const previewView = document.querySelector("#preview-view")
const cssView = document.querySelector("#css-view")
const previewTab = document.querySelector("#preview-tab")
const cssTab = document.querySelector("#css-tab")
const status = document.querySelector("#live-status")
const statusLabel = document.querySelector("#status-label")
const themeButton = document.querySelector("#theme-button")
const themeLabel = document.querySelector("#theme-label")
const divider = document.querySelector("#divider")
const workspace = document.querySelector("#workspace")
const toast = document.querySelector("#toast")

let activeExample = "profile"
let renderTimer
let renderTimeout
let loaderTimer
let toastTimer
let renderId = 0
let activeFrame = 0
let isDragging = false
let letTabLeaveEditor = false
let previewTheme = ""
let horizontalSplit = readNumber(STORAGE.splitHorizontal, 48)
let verticalSplit = readNumber(STORAGE.splitVertical, 48)

function readStorage(key) {
	try {
		return localStorage.getItem(key)
	} catch {
		return null
	}
}

function writeStorage(key, value) {
	try {
		localStorage.setItem(key, value)
	} catch {
		// Storage can be unavailable in private browsing contexts.
	}
}

function readNumber(key, fallback) {
	const stored = readStorage(key)
	if (stored === null) return fallback

	const value = Number(stored)
	return Number.isFinite(value) ? clamp(value, 25, 75) : fallback
}

function clamp(value, minimum, maximum) {
	return Math.min(maximum, Math.max(minimum, value))
}

function readTheme() {
	const stored = readStorage(STORAGE.theme) ?? ""
	return THEMES.includes(stored) ? stored : ""
}

function setTheme(theme) {
	previewTheme = theme
	writeStorage(STORAGE.theme, theme)
	themeLabel.textContent = THEME_LABELS[theme]
	themeButton.setAttribute("aria-label", `Preview color scheme: ${THEME_LABELS[theme]}`)
	// SVG elements have no `hidden` IDL property, so toggle the attribute and style it ourselves.
	for (const icon of themeButton.querySelectorAll("svg")) {
		icon.toggleAttribute("hidden", icon.dataset.theme !== theme)
	}
}

function getSharedSource() {
	const parameters = new URLSearchParams(window.location.hash.slice(1))
	if (!parameters.has("code")) return null

	const source = parameters.get("code") ?? ""
	return source.length <= 100_000 ? source : null
}

function findMatchingExample(source) {
	return Object.keys(EXAMPLES).find(key => EXAMPLES[key] === source) ?? "custom"
}

function initialSource() {
	const shared = getSharedSource()
	if (shared !== null) return shared

	return readStorage(STORAGE.source) ?? EXAMPLES.profile
}

function setStatus(label, mode = "live") {
	statusLabel.textContent = label
	status.classList.toggle("is-busy", mode === "busy")
	status.classList.toggle("is-error", mode === "error")
}

function showToast(message, mode = "default") {
	window.clearTimeout(toastTimer)
	toast.textContent = message
	toast.classList.toggle("is-error", mode === "error")
	toast.classList.add("is-visible")
	toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200)
}

function updateLineNumbers() {
	const count = editor.value.split("\n").length
	lineNumbers.textContent = Array.from({ length: count }, (_, index) => index + 1).join("\n")
	lineNumbers.scrollTop = editor.scrollTop
}

function updateCursorPosition() {
	const beforeCursor = editor.value.slice(0, editor.selectionStart)
	const lines = beforeCursor.split("\n")
	cursorPosition.textContent = `Ln ${lines.length}, Col ${lines.at(-1).length + 1}`
}

// The preview runs in a sandboxed iframe with an opaque origin, so this is defence in depth:
// scripts and handlers are removed mostly so a typo cannot lock up the tab.
function sanitizeDocument(source) {
	const doc = new DOMParser().parseFromString(source, "text/html")

	for (const blocked of doc.querySelectorAll("script, iframe, object, embed, base, meta")) blocked.remove()

	for (const element of doc.querySelectorAll("*")) {
		for (const attribute of [ ...element.attributes ]) {
			const name = attribute.name.toLowerCase()
			const unsafeUrl = [ "href", "src", "xlink:href", "formaction", "action" ].includes(name)
				&& /^\s*(?:javascript|vbscript):/i.test(attribute.value)
			if (name.startsWith("on") || name === "srcdoc" || unsafeUrl) {
				element.removeAttribute(attribute.name)
			}
		}
	}

	return doc
}

// A complete document for the preview frame: the user's markup with its own copy of
// click-css in <head>, a localStorage shim carrying the chosen THEME (the sandbox has no
// storage of its own), and a reporter that posts the compiled CSS back once the page loads.
function buildPreviewDocument(source, theme, id) {
	const doc = sanitizeDocument(source)

	const shim = doc.createElement("script")
	shim.textContent = `Object.defineProperty(window, "localStorage", { value: { length: 0, key: () => null, getItem: key => key === "THEME" ? ${JSON.stringify(theme || null)} : null, setItem() {}, removeItem() {}, clear() {} } })`

	const runtime = doc.createElement("script")
	runtime.setAttribute("src", RUNTIME_URL)

	const reporter = doc.createElement("script")
	reporter.textContent = `(() => {
	const post = message => parent.postMessage(Object.assign({ id: ${id} }, message), "*")
	let reset = ""
	try {
		click()
		reset = document.querySelector("style[click]").textContent
	} catch (error) {
		addEventListener("load", () => post({ type: "click-css:error", message: String(error) }))
		return
	}
	addEventListener("click", event => {
		if (event.target instanceof Element && event.target.closest("a")) event.preventDefault()
	})
	addEventListener("submit", event => event.preventDefault())
	addEventListener("load", () => setTimeout(() => {
		const sheet = document.querySelector("style[click]")
		post({ type: "click-css:css", css: sheet ? sheet.textContent.slice(reset.length) : "" })
	}))
})()`

	doc.head.prepend(shim, runtime, reporter)
	return "<!doctype html>" + doc.documentElement.outerHTML
}

function scheduleRender() {
	window.clearTimeout(renderTimer)
	setStatus("Editing…", "busy")
	renderTimer = window.setTimeout(render, 160)
}

// Two frames alternate: the standby frame loads the new document while the active one stays
// visible, and they swap once the new document reports its CSS. No flash between edits.
function render() {
	window.clearTimeout(renderTimer)
	window.clearTimeout(renderTimeout)
	window.clearTimeout(loaderTimer)
	setStatus("Rendering…", "busy")
	loaderTimer = window.setTimeout(() => previewLoader.classList.add("is-visible"), LOADER_DELAY)

	const id = ++renderId
	previewFrames[1 - activeFrame].srcdoc = buildPreviewDocument(editor.value, previewTheme, id)
	renderTimeout = window.setTimeout(() => failRender("The preview did not respond."), RENDER_TIMEOUT)
}

function finishRender(css) {
	window.clearTimeout(renderTimeout)
	window.clearTimeout(loaderTimer)
	previewFrames[activeFrame].classList.add("is-standby")
	activeFrame = 1 - activeFrame
	previewFrames[activeFrame].classList.remove("is-standby")
	updateGeneratedCss(css)
	previewLoader.classList.remove("is-visible")
	setStatus("Live")
}

function failRender(message) {
	window.clearTimeout(renderTimeout)
	window.clearTimeout(loaderTimer)
	previewLoader.classList.remove("is-visible")
	setStatus("Runtime error", "error")
	showToast(message, "error")
}

function formatCss(css) {
	let formatted = ""
	let indentation = 0
	let quote = ""
	let escaped = false
	let cssEscaped = false
	let parentheses = 0
	let atLineStart = true

	const append = value => {
		if (atLineStart && value !== "\n") {
			formatted += "  ".repeat(indentation)
			atLineStart = false
		}
		formatted += value
		if (value.endsWith("\n")) atLineStart = true
	}

	for (const character of css.trim()) {
		if (quote) {
			append(character)
			if (escaped) escaped = false
			else if (character === "\\") escaped = true
			else if (character === quote) quote = ""
			continue
		}

		if (cssEscaped) {
			append(character)
			cssEscaped = false
			continue
		}

		if (character === "\\") {
			append(character)
			cssEscaped = true
			continue
		}

		if (character === '"' || character === "'") {
			quote = character
			append(character)
			continue
		}

		if (character === "(") parentheses += 1
		if (character === ")") parentheses = Math.max(0, parentheses - 1)

		if (parentheses === 0 && character === "{") {
			formatted = formatted.trimEnd()
			append(" {\n")
			indentation += 1
		} else if (parentheses === 0 && character === ";") {
			append(";\n")
		} else if (parentheses === 0 && character === "}") {
			formatted = formatted.trimEnd()
			formatted += "\n"
			atLineStart = true
			indentation = Math.max(0, indentation - 1)
			append("}\n")
		} else {
			append(character)
		}
	}

	return formatted.trim() || "/* No Click CSS rules yet. */"
}

function formatBytes(css) {
	const bytes = new TextEncoder().encode(css).length
	if (bytes < 1000) return `${bytes} B`
	return `${(bytes / 1000).toFixed(bytes < 10_000 ? 1 : 0)} kB`
}

function updateGeneratedCss(css) {
	cssOutput.textContent = formatCss(css)
	cssSize.textContent = formatBytes(css)
}

function setEditorSource(source, example = "custom") {
	editor.value = source
	activeExample = example === "custom" ? activeExample : example
	exampleSelect.value = example
	writeStorage(STORAGE.source, source)
	updateLineNumbers()
	updateCursorPosition()
	render()
}

function onEditorInput() {
	writeStorage(STORAGE.source, editor.value)
	exampleSelect.value = "custom"
	updateLineNumbers()
	updateCursorPosition()

	if (window.location.hash.includes("code=")) {
		history.replaceState(null, "", `${window.location.pathname}${window.location.search}`)
	}

	scheduleRender()
}

function handleEditorKeydown(event) {
	if (event.key === "Escape") {
		letTabLeaveEditor = true
		showToast("Press Tab to leave the editor.")
		return
	}

	if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
		letTabLeaveEditor = false
		event.preventDefault()
		render()
		return
	}

	if (event.key !== "Tab") {
		letTabLeaveEditor = false
		return
	}

	if (letTabLeaveEditor) {
		letTabLeaveEditor = false
		return
	}

	const start = editor.selectionStart
	const end = editor.selectionEnd
	const value = editor.value

	if (event.shiftKey) {
		const lineStart = value.lastIndexOf("\n", start - 1) + 1
		const removable = value.slice(lineStart, lineStart + 2).match(/^(?:\t| {1,2})/)?.[0] ?? ""
		if (!removable) return

		event.preventDefault()
		editor.setRangeText("", lineStart, lineStart + removable.length, "preserve")
		editor.selectionStart = Math.max(lineStart, start - removable.length)
		editor.selectionEnd = Math.max(lineStart, end - removable.length)
	} else {
		event.preventDefault()
		editor.setRangeText("\t", start, end, "end")
	}

	onEditorInput()
}

async function writeClipboard(text) {
	if (navigator.clipboard?.writeText && window.isSecureContext) {
		await navigator.clipboard.writeText(text)
		return
	}

	const helper = document.createElement("textarea")
	helper.value = text
	helper.setAttribute("readonly", "")
	helper.style.position = "fixed"
	helper.style.opacity = "0"
	document.body.append(helper)
	helper.select()
	const copied = document.execCommand("copy")
	helper.remove()
	if (!copied) throw new Error("Clipboard is unavailable")
}

async function copySource() {
	try {
		await writeClipboard(editor.value)
		showToast("HTML copied to clipboard.")
	} catch {
		showToast("Could not access the clipboard.", "error")
	}
}

async function shareSource() {
	if (editor.value.length > 100_000) {
		showToast("This source is too large to share as a URL.", "error")
		return
	}

	const baseUrl = window.location.href.split("#")[0]
	const shareUrl = `${baseUrl}#code=${encodeURIComponent(editor.value)}`

	try {
		history.replaceState(null, "", shareUrl)
		await writeClipboard(shareUrl)
		showToast("Share link copied.")
	} catch {
		showToast("Could not copy the share link.", "error")
	}
}

function activateOutput(name, focus = false) {
	const showPreview = name === "preview"
	previewView.hidden = !showPreview
	cssView.hidden = showPreview
	previewTab.classList.toggle("is-active", showPreview)
	cssTab.classList.toggle("is-active", !showPreview)
	previewTab.setAttribute("aria-selected", String(showPreview))
	cssTab.setAttribute("aria-selected", String(!showPreview))
	previewTab.tabIndex = showPreview ? 0 : -1
	cssTab.tabIndex = showPreview ? -1 : 0
	if (focus) (showPreview ? previewTab : cssTab).focus()
}

function setSplit(value, stacked = stackedLayout.matches) {
	const percentage = clamp(value, 25, 75)
	if (stacked) {
		verticalSplit = percentage
		workspace.style.setProperty("--editor-block-size", `${percentage}%`)
		writeStorage(STORAGE.splitVertical, percentage)
	} else {
		horizontalSplit = percentage
		workspace.style.setProperty("--editor-size", `${percentage}%`)
		writeStorage(STORAGE.splitHorizontal, percentage)
	}
	divider.setAttribute("aria-valuenow", String(Math.round(percentage)))
}

function updateDividerOrientation() {
	divider.setAttribute("aria-orientation", stackedLayout.matches ? "horizontal" : "vertical")
	setSplit(stackedLayout.matches ? verticalSplit : horizontalSplit)
}

function resizeFromPointer(event) {
	if (!isDragging) return
	const bounds = workspace.getBoundingClientRect()
	const percentage = stackedLayout.matches
		? (event.clientY - bounds.top) / bounds.height * 100
		: (event.clientX - bounds.left) / bounds.width * 100
	setSplit(percentage)
}

function stopDragging(event) {
	if (!isDragging) return
	isDragging = false
	divider.classList.remove("is-dragging")
	if (event.pointerId !== undefined && divider.hasPointerCapture(event.pointerId)) {
		divider.releasePointerCapture(event.pointerId)
	}
}

function handleDividerKeydown(event) {
	const amount = event.shiftKey ? 5 : 1
	const current = stackedLayout.matches ? verticalSplit : horizontalSplit
	let next = current

	if (event.key === "Home") next = 25
	else if (event.key === "End") next = 75
	else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next -= amount
	else if (event.key === "ArrowRight" || event.key === "ArrowDown") next += amount
	else return

	event.preventDefault()
	setSplit(next)
}

window.addEventListener("message", event => {
	const data = event.data
	if (event.source !== previewFrames[1 - activeFrame].contentWindow) return
	if (!data || typeof data !== "object" || data.id !== renderId) return

	if (data.type === "click-css:css") finishRender(typeof data.css === "string" ? data.css : "")
	else if (data.type === "click-css:error") failRender("Click CSS failed to load in the preview.")
})

editor.addEventListener("input", onEditorInput)
editor.addEventListener("keydown", handleEditorKeydown)
editor.addEventListener("keyup", updateCursorPosition)
editor.addEventListener("click", updateCursorPosition)
editor.addEventListener("select", updateCursorPosition)
editor.addEventListener("scroll", () => { lineNumbers.scrollTop = editor.scrollTop })

exampleSelect.addEventListener("change", () => {
	const key = exampleSelect.value
	if (!(key in EXAMPLES)) return
	setEditorSource(EXAMPLES[key], key)
})

themeButton.addEventListener("click", () => {
	setTheme(THEMES[(THEMES.indexOf(previewTheme) + 1) % THEMES.length])
	render()
})

document.querySelector("#reset-button").addEventListener("click", () => {
	setEditorSource(EXAMPLES[activeExample], activeExample)
	showToast("Example reset.")
})
document.querySelector("#copy-button").addEventListener("click", copySource)
document.querySelector("#share-button").addEventListener("click", shareSource)
document.querySelector("#run-button").addEventListener("click", render)

previewTab.addEventListener("click", () => activateOutput("preview"))
cssTab.addEventListener("click", () => activateOutput("css"))
for (const tab of [ previewTab, cssTab ]) {
	tab.addEventListener("keydown", event => {
		if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
		event.preventDefault()
		activateOutput(tab === previewTab ? "css" : "preview", true)
	})
}

divider.addEventListener("pointerdown", event => {
	isDragging = true
	divider.classList.add("is-dragging")
	divider.setPointerCapture(event.pointerId)
	resizeFromPointer(event)
})
divider.addEventListener("pointermove", resizeFromPointer)
divider.addEventListener("pointerup", stopDragging)
divider.addEventListener("pointercancel", stopDragging)
divider.addEventListener("keydown", handleDividerKeydown)

window.addEventListener("hashchange", () => {
	const shared = getSharedSource()
	if (shared !== null && shared !== editor.value) {
		setEditorSource(shared, findMatchingExample(shared))
	}
})
stackedLayout.addEventListener("change", updateDividerOrientation)

const source = initialSource()
const matchingExample = findMatchingExample(source)
if (matchingExample !== "custom") activeExample = matchingExample
editor.value = source
exampleSelect.value = matchingExample
updateLineNumbers()
updateCursorPosition()
setSplit(horizontalSplit, false)
setSplit(verticalSplit, true)
updateDividerOrientation()
setTheme(readTheme())
activateOutput("preview")
render()

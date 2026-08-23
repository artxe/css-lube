# Click CSS

![Intellisense Click CSS](https://raw.githubusercontent.com/Artxe/click-css/main/assets/intellisense.gif)

> **Write CSS in the `class` attribute** — declarations, selectors and media queries, compiled in the browser with no build step.

6.3 KB, 2.7 KB gzip. Class tokens are parsed at runtime and turned into CSS instantly. If you know basic CSS, this README is all you need.

**[Open the Playground →](https://artxe.github.io/click-css/)** — edit markup on the left, watch the preview and the generated CSS update as you type, drag the divider to test media queries, and flip the preview between light and dark.

---

## Getting Started

Paste this into an `.html` file and open it — nothing to install:

```html
<!doctype html>
<html>
  <head>
    <script src="https://artxe.github.io/click-css/min.js"></script>
  </head>
  <body class="padding=24px font-family=system-ui">
    <h1 class="font-size=24px color=#111 margin=0">Hello Click!</h1>
    <p class="line-height=1.5 color=#555">No build step. No config. Just classes.</p>
  </body>
</html>
```

- **That URL is for trying, not shipping.** It carries no version and serves whatever `main` last built. Copy [min.js](./packages/lib/min.js) into your project and point the tag at your copy.
- **Load it in `<head>` as a classic `<script>`** — no `defer`, no `type="module"`. It then runs while the page is still parsing, so the CSS exists before the first style calculation and nothing flashes unstyled. `import "click-css"` throws `ReferenceError`: the rebuild hook is published by assigning a bare `click`, which strict mode rejects.

Examples below spell properties out in full; [shorthands](#shorthands) come at the end.

---

## Editor Support

[Intellisense Click CSS](https://marketplace.visualstudio.com/items?itemName=Artxe.intellisense-click-css) for VSCode — hover CSS preview, syntax highlighting, shorthand autocomplete.

---

## Grammar

Every class on the page is parsed and the result injected into one `<style>` tag. A class compiles when it contains `:` or `=` with a character on each side, or a value shorthand. It is skipped when it would leave the sheet open and swallow every rule after it — an unclosed `'`, `"`, `(` or `[`, or a trailing `\`. Quoted text is not a block: `content='('` is kept.

The first character picks the shape:

| First character | Shape |
|---|---|
| `-` or `a`–`z` | declarations, applied to the class itself |
| `@` | `@<query>@<style>` — a media query, or a raw at-rule with `@@` |
| anything else | `<selector>/<style>` — a selector-scoped rule |

| Syntax | Meaning |
|---|---|
| `_` | space |
| `=` | `:` |
| `\_` / `\=` | a literal `_` / `=` |
| trailing `!` | boost specificity (stackable: `!!`, `!!!`, …) |
| `&` in a query | ` and ` |
| `<key>=<value>` in a query | `(<key>:<value>)` |
| `--name` in a value | `var(--name)` — outside parentheses only |
| `~` starting a value | leave the value's numbers without the default unit |

### Declarations

```html
<html class="color:red;background:blue margin=1px_5px new-property:new-value">
```

```css
.color\:red\;background\:blue { color: red; background: blue }
.margin\=1px_5px { margin: 1px 5px }
.new-property\:new-value { new-property: new-value }
```

Backslash-escape `_` or `=` to keep it literal — file paths, query strings, quoted text:

```html
<html class="background-image=url(/img/hero\_bg.png?v\=2)">
<!-- background-image: url(/img/hero_bg.png?v=2) -->
```

`;` needs no escape: nothing splits on it, so a `;` inside a value survives, data URIs included. The one misfire is a `;` directly followed by a property shorthand and `=`, which reads as a new declaration:

```html
<html class="content='a;b=c'"><!-- content: 'a;bottom:c' ✗ -->
<html class="content='a;b\=c'"><!-- content: 'a;b=c' -->
```

If you need the colon itself, write the semicolon as the CSS escape `\3b` and terminate it with `_`: `content='a\3b_b=c'` is `content: 'a\3b b:c'`, which CSS reads as `a;b:c`.

### Selectors

A class starting with any other character is split at the first top-level `/` into `<selector>/<style>`. A `/` inside `'…'`, `"…"`, `(…)` or `[…]` belongs to the selector.

```html
<html class=":hover:after/width=100px _[type=number]/font-size=2em >div/color=#000 [href='/docs']/color=red">
```

```css
.\:hover\:after\/width\=100px:hover:after { width: 100px }
._\[type\=number\]\/font-size\=2em [type=number] { font-size: 2em }
.\>div\/color\=\#000>div { color: #000 }
.\[href\=\'\/docs\'\]\/color\=red[href='/docs'] { color: red }
```

Write `>`, `<`, `&` and `"` exactly as you mean them. Attribute serialization escapes them, and Click CSS decodes them as it collects tokens.

Style descendants from the parent rather than repeating tokens on every child: a leading `_` is a descendant combinator, `>` a child combinator. Once a class carries several rules, give each its own line — plain declarations first, then one selector per line:

```html
<div class="position=fixed height=100% overflow=hidden width=100%
	:not([data-show=default])>canvas/display=none
	[activate]/border-radius=16px;transform=scale(.8)
	[activate]>button/background=rgba(0,0,0,.8)">
```

### Priority (`!`)

Each trailing `!` prepends one `[class]` — more specificity without `!important`, and still overridable.

```html
<html class="width=100px!! width=200px">
```

```css
[class][class].width\=100px\!\! { width: 100px }  /* wins */
.width\=200px { width: 200px }
```

### Media queries

```html
<html class="@max-width=200px&min-width=100px@width=100px">
```

```css
@media (max-width: 200px) and (min-width: 100px) {
  .\@max-width\=200px\&min-width\=100px\@width\=100px { width: 100px }
}
```

A `=` belonging to `>=` or `<=` is left alone, so Media Queries Level 4 range syntax works as written: `@(width>=640px)@width=100px`, `@(400px<=width<=700px)@width=100px`.

`@@` skips the automatic `@media` prefix for any other at-rule — `@supports`, `@layer`, `@container`, …:

```html
<html class="@@supports_display=grid@display=grid">
```

```css
@supports (display: grid) {
  .\@\@supports_display\=grid\@display\=grid { display: grid }
}
```

`<key>=<value>` supplies the parentheses; adding your own gives `@supports ((display: grid))`, valid but redundant.

### Dark mode via `localStorage`

A `prefers-color-scheme` query follows the OS setting on its own. To let the user override it, set `THEME` to `DARK` or `LIGHT` and call `click()`: `prefers-color-scheme:dark` is rewritten to `color`, a query that is always true, or to nothing, a query that never matches.

```html
<html class="@prefers-color-scheme=dark@color=white color=black">
<script>
  localStorage.setItem("THEME", "DARK") // or "LIGHT"
  click() // rebuild the stylesheet
</script>
```

```css
.color\=black { color: black }
@media (color) {   /* THEME=DARK  → always on  */
  .\@prefers-color-scheme\=dark\@color\=white { color: white }
}
@media () {        /* THEME=LIGHT → never on   */ }
```

### Custom properties

Outside parentheses, a `--name` that follows `:`, a space or a comma is wrapped in `var()`. Inside parentheses nothing is wrapped — write `var()` yourself.

```html
<html class="background=--bgc border=1px_solid_--line width=calc(var(--gap)_*_2)">
```

```css
.background\=--bgc { background: var(--bgc) }
.border\=1px_solid_--line { border: 1px solid var(--line) }
.width\=calc\(var\(--gap\)_\*_2\) { width: calc(var(--gap) * 2) }
```

Defining one needs nothing special — a property beginning with `--` sets it on the element that carries the class, so a whole theme can sit on `<html>`:

```html
<html class="--line=#242630;--text=#f1f1f4;--gap=12px">
```

One token can define and use: `--gap=12;padding=--gap` is `--gap: 12px; padding: var(--gap)`. The default unit is chosen from the variable's own name — `--gap` and `--width` get it, `--z` does not — and `~` opts out as anywhere else.

**Dashed idents belong in `<style>`.** The wrapping is unconditional, so a property that takes a *name* gets wrapped too: `anchor-name=--card` becomes `anchor-name: var(--card)`. Declare `anchor-name`, `anchor-scope`, `position-anchor`, `view-transition-name`, `animation-timeline`, `scroll-timeline-name`, `view-timeline-name`, `timeline-scope`, `scroll-timeline` and `view-timeline` in a `<style>` tag, where `@font-face` and `@keyframes` already live. Only the declaration moves; values that reference the name still work inline:

```html
<style>
  .card { anchor-name: --card }
</style>

<div class="card width=200px height=120px">Anchor</div>
<div class="position=fixed top=anchor(--card_bottom) left=anchor(--card_left)">Tooltip</div>
```

### Parentheses stop the value transforms

`_` and `=` are character aliases and apply everywhere, so spaces inside a function are still written with `_`. Nothing else reaches past a `(` — no operator spacing, no unit appending, no `var()` wrapping. Write those yourself:

```html
<html class="width=calc(100%_-_16px) height=calc(100vh_-_var(--header-height))">
```

```css
.width\=calc\(100\%_-_16px\) { width: calc(100% - 16px) }
.height\=calc\(100vh_-_var\(--header-height\)\) { height: calc(100vh - var(--header-height)) }
```

This is what keeps hyphenated identifiers intact: Click CSS never has to guess whether a `-` is a minus sign or part of a name. It is also why a bare number inside parentheses keeps no unit — `calc(100%_-_16)` stays `calc(100% - 16)`, which CSS rejects. Write `16px`.

---

## Shorthands

Three categories ship predefined. Value shorthands are the only tokens parsed without a `:` or `=`.

```html
<html class="flex @dark@c=white">
```

```css
.flex { display: flex }
@media (prefers-color-scheme: dark) {
  .\@dark\@c\=white { color: white }
}
```

- [Properties](./packages/lib/click-css.js#L18): `w` → `width`, `h` → `height`, `c` → `color`, `d` → `display`, … A family shares one prefix — `bd` borders, `br` radii, `m` margins, `t` text — and a member you reach for constantly gets its own anchor, which is why `border-radius` is `br` and its corners are `brtl` / `brtr` / `brbl` / `brbr`. Axes follow the usual convention: `mx` / `my`, `px` / `py`.
- [Values](./packages/lib/click-css.js#L112): `flex`, `grid`, `block`, `absolute`, `relative`, …
- [Media conditions](./packages/lib/click-css.js#L133): `dark`, `sm`, `md`, `lg`, `xl`, `hover`, …

### The default unit

Bare numbers in dimension properties (`border`, `width`, `gap`, …) get `px`. Change [`default_unit`](./packages/lib/click-css.js#L149) for `rem` or anything else.

```html
<html class="w=100"><!-- width: 100px -->
```

Start a value with `~` — straight after the `=`, ahead of any minus sign — and none of its numbers take the unit. Use it wherever a bare number is not a length, including properties the name matcher has never heard of:

```html
<html class="tab-size=~4"><!-- tab-size: 4 -->
<html class="border-image-width=~2_3_4_5"><!-- border-image-width: 2 3 4 5 -->
```

A number you write a unit on is never touched, so the two mix: `mask-border=~url(mask.png)_30_/_20px` keeps the slice bare and the width in `px`.

`line-height` and `stroke-width` are excluded by name instead, because a bare number is the ordinary way to write them and a wrong one is easy to miss. Grid line numbers in `grid-row-start` and friends are never matched to begin with. `~` on any of these is harmless.

### Classes you did not write for Click CSS

Value shorthands are ordinary words, and every class goes through the same parse. A class named exactly `block`, `flex`, `grid`, `inline`, `none`, `column`, `column-reverse`, `row`, `row-reverse`, `nowrap`, `wrap`, `isolate`, `absolute`, `fixed`, `relative`, `static` or `sticky` gets the declaration whether you meant it or not — Bootstrap's `.row` picks up `flex-direction: row`. Rename the clash, or delete the entry from [`shorthand_for_values`](./packages/lib/click-css.js#L112).

A class that merely *contains* one compiles to an invalid rule and is left alone on purpose:

```css
.wrapper { wrapper }            /* class="wrapper", contains "wrap" */
.grid-item { grid-item }
```

Browsers drop invalid declarations, so nothing renders differently — it costs a few bytes in the sheet. Names with no shorthand inside them (`container`, `sidebar`, `card`, `col-6`) are never touched.

---

## CSS Reset

A built-in reset is injected at startup. Customize it via [`pure_style`](./packages/lib/click-css.js#L7).

---

## Browser Support

Chrome 80+, Firefox 78+, Safari 16.4+ — the floor is set by optional chaining, `matchAll` and the regex lookbehind in the property matcher.

---

## Performance

- **Staged regex pipeline.** Parsing is a series of O(n) string transformations, each run natively by the regex engine. Every stage is a literal alternation anchored to `^`, `/` or `;`, which the engine prefilters; a generic match plus hash lookup measured *slower* than the 90-way property alternation.
- **Dual `MutationObserver`.** Class attribute mutations iterate `classList`. Subtree mutations serialize the changed root to `outerHTML` and extract every class token in one regex pass — no DOM walking, no `querySelectorAll`. Over 12 000 elements: 3.4 ms, against 4.9 ms for `querySelectorAll` and 4.6 ms for a `TreeWalker`.
- **Whole-sheet `textContent`.** New rules are appended and the whole `<style>` text rewritten rather than spliced in with `insertRule`: at 4 000 rules a full rewrite costs 0.7 ms against 2.9 ms, and stays ahead even for a single added rule.
- **Parse-phase execution.** Loaded as a classic `<script>` in `<head>`, the initial CSS is absorbed into the browser's first style calculation — no extra reflow or repaint.

Tokens are deduplicated with a `Set`, and the `<style>` element is rewritten only when new tokens appear.

---

## Repository

A pnpm workspace: [`packages/lib`](./packages/lib) the library (`click-css.js`, its `.d.ts`, the built `min.js`), [`packages/test`](./packages/test) 288 tests over the real source through both collection paths plus VSCode-extension parity, [`packages/vsce`](./packages/vsce) the extension, [`docs`](./docs) the playground published to GitHub Pages.

```bash
pnpm test    # node --test
pnpm build   # terser → packages/lib/min.js + docs/min.js; fails if the version stamp disagrees with package.json
pnpm lint    # tsc + eslint --fix
```

---

MIT © Artxe · [Changelog](./CHANGELOG.md)

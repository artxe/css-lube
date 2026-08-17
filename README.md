# Click CSS

![Intellisense Click CSS](https://raw.githubusercontent.com/Artxe/click-css/main/assets/intellisense.gif)

> **Write CSS in the `class` attribute** — declarations, selectors and media queries, compiled in the browser with no build step.

An extremely optimized library (≈6.3KB, ≈2.7KB gzip) that parses class tokens at runtime and converts them to CSS instantly. If you know basic CSS, this README is all you need.

**[Open the Playground →](https://artxe.github.io/click-css/)** — edit markup on the left, watch the preview and the generated CSS update as you type.

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

**That URL is for trying it, not for shipping.** It carries no version, so it always serves whatever `main` last built — the next breaking release would land on your users with no warning, and GitHub Pages promises no uptime for anyone else's traffic. Before you ship, save [min.js v1.1.0](./packages/lib/min.js) into your own project and point the tag at your copy. It is 2.7 KB over the wire, so there is little reason to spend a third-party request on it anyway.

Load it in `<head>` **without** `defer` or `type="module"`. It then runs while the page is still parsing, so the CSS exists before the first style calculation — no flash of unstyled content. Anywhere else works too, it just costs you a repaint.

It has to be a classic `<script>`, not an import. The rebuild hook is published by assigning a bare `click`, which a module or a bundled chunk evaluates in strict mode and rejects:

```js
import "click-css" // ReferenceError: click is not defined
```

Every example below spells CSS properties out in full. [Shorthands](#shorthands) come at the end, once the syntax itself is out of the way.

---

## Editor Support (VSCode)

[Intellisense Click CSS](https://marketplace.visualstudio.com/items?itemName=Artxe.intellisense-click-css) — syntax highlighting, hover CSS preview, shorthand autocomplete.

---

## Grammar

Any class starting with `-` or a lowercase letter `a`–`z` is parsed and injected into a `<style>` tag.

A class is skipped when it carries no `:` or `=` and is not a value shorthand, or when emitting it would leave the sheet open and swallow every rule after it — an unclosed `'`, `"`, `(` or `[`, or a trailing `\`. Quoted text is not a block, so `content='('` is kept.

| Syntax | Meaning |
|--------|---------|
| `_` | space |
| `=` | `:` |
| `\_` / `\=` | a literal `_` / `=` |
| trailing `!` | boost specificity (stackable: `!!`, `!!!`, …) |
| `<selector>/<style>` | selector-scoped rule |
| `@<query>@<style>` | media query (`@media` prepended automatically) |
| `@@<at-rule>@<style>` | raw at-rule |
| `&` in query | ` and ` |
| `<key>=<value>` in query | `(<key>:<value>)` |
| `--var` in value | `var(--var)` — outside parentheses only |
| `~` starting a value | leave the value's numbers without the default unit |

### Basic styles

```html
<html class="color:red;background:blue new-property:new-value">
```

```css
.color\:red\;background\:blue { color: red; background: blue }
.new-property\:new-value { new-property: new-value }
```

### Space and colon aliasing

```html
<html class="margin=1px_5px">
```

```css
.margin\=1px_5px { margin: 1px 5px }
```

Backslash-escape either one to keep it literal — needed for file paths, query strings and quoted text:

```html
<html class="background-image=url(/img/hero\_bg.png?v\=2)">
```

```css
.background-image\=url\(\/img\/hero\\_bg\.png\?v\\\=2\) { background-image: url(/img/hero_bg.png?v=2) }
```

`;` has no escape of its own and rarely needs one. Nothing splits on it — it only anchors "a new declaration starts here" — so a `;` inside a value survives, data URIs included:

```html
<html class="background-image=url(data:image/png;base64,iVBOR)">
```

It misfires in one shape: a `;` followed by something that looks like a shorthand assignment, meaning one to four lowercase letters and an `=`.

```html
<html class="content='a;b=c'"><!-- content: 'a;bottom:c' ✗ -->
```

Escaping the `=` is enough, since the expansion is what looks for the colon:

```html
<html class="content='a;b\=c'"><!-- content: 'a;b=c' -->
```

If you need the colon itself, write the semicolon as the CSS escape `\3b` — `_` supplies the space that terminates it:

```html
<html class="content='a\3b_b=c'"><!-- content: 'a\3b b:c', which CSS reads as a;b:c -->
```

### Selectors

Use `/` as a delimiter in the format `<selector>/<style>`. Classes starting with a special character (not `-` or `a`–`z`) trigger selector-scoped rules.

Write `>`, `<`, `&` and `"` in a class exactly as you mean them. Serializing an attribute escapes all four (`&gt;`, `&lt;`, `&amp;`, `&quot;`), and Click CSS undoes that as it collects tokens, so both the parse-time and the class-mutation path see the same string.

```html
<html class=":hover:after/width=100px _[type=number]/font-size=2em >div/color=#000">
```

```css
.\:hover\:after\/width\=100px:hover:after { width: 100px }
._\[type\=number\]\/font-size\=2em [type=number] { font-size: 2em }
.\>div\/color\=\#000>div { color: #000 }
```

Only a top-level `/` splits the class — one nested in `'…'`, `"…"`, `(…)` or `[…]` is left to the selector:

```html
<html class="[href='/docs']/color=red :not(.a/b)/color=red">
```

Style a descendant from the parent rather than repeating the same tokens on every child. A leading `_` is the space of a descendant combinator; `>` is a child combinator:

```html
<select class="border=1px_solid_#ccc >option/color=red _optgroup/font-weight=600">
```

```css
.…>option { color: red }
.… optgroup { font-weight: 600 }
```

Once a class carries several rules, give each its own line. Plain declarations first, then one selector per line:

```html
<div class="position=fixed height=100% overflow=hidden width=100%
	:not([data-show=default])>canvas/display=none
	[activate]/border-radius=16px;transform=scale(.8)
	[activate]>button/background=rgba(0,0,0,.8)">
```

### Priority (`!`)

Appending `!` stacks `[class]` selectors to boost specificity — no `!important` needed, and overridable any number of times.

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

`<key>=<value>` becomes `(<key>:<value>)`, but a `=` that is part of `>=` or `<=` is left alone, so range syntax works as written:

```html
<html class="@(width>=640px)@width=100px @(400px<=width<=700px)@width=100px">
```

```css
@media (width>=640px) { … }
@media (400px<=width<=700px) { … }
```

Use `@@` to write a raw at-rule without the automatic `@media` prefix:

```html
<html class="@@supports_display=grid@display=grid">
```

```css
@supports (display: grid) {
  .\@\@supports_display\=grid\@display\=grid { display: grid }
}
```

`@layer`, `@container` and the rest work the same way. Since `<key>=<value>` supplies the parentheses, adding your own nests them — `@@supports_(display=grid)@…` gives `@supports ((display: grid))`, which is valid but redundant.

### Dark mode via `localStorage`

A `prefers-color-scheme` query follows the OS setting on its own. To let the user override it, set `THEME` and rebuild — `prefers-color-scheme:dark` is swapped for `color`, a query that is always true, or for nothing, a query that never matches.

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

### CSS custom properties

Outside parentheses, a `--name` token is wrapped in `var()` whenever it follows `:`, a space, or a comma.

```html
<html class="background=--bgc border=1px_solid_--line">
```

```css
.background\=--bgc { background: var(--bgc) }
.border\=1px_solid_--line { border: 1px solid var(--line) }
```

The wrapping stops at `(`, so write `var()` yourself inside a function:

```html
<html class="width=calc(var(--gap)_*_2)">
<html class="background-color=rgb(var(--r)_var(--g)_0)">
```

Defining a variable needs nothing special — a property beginning with `--` sets it on whatever element carries the class, so a whole theme can sit on `<html>`:

```html
<html class="--line=#242630;--text=#f1f1f4;--gap=12px">
```

```css
.--line\=\#242630\;--text\=\#f1f1f4\;--gap\=12px { --line: #242630; --text: #f1f1f4; --gap: 12px }
```

One token can define and use in the same breath: `--gap=12;padding=--gap` is `--gap: 12px; padding: var(--gap)`. The default unit is chosen from the variable's own name, so `--gap` and `--width` get it while `--z` does not — `~` opts out as anywhere else.

#### Dashed idents belong in `<style>`

Outside parentheses the wrapping is unconditional — nothing in the token says whether `--card` means "read this variable" or "this is a name". A handful of properties take a *dashed ident* rather than a variable reference, and Click CSS wraps those too:

```html
<html class="anchor-name=--card"><!-- anchor-name: var(--card) ✗ -->
```

This is a deliberate trade, not a gap. Auto-wrapping earns its keep on every color, spacing and border you write, while naming a dashed ident comes up rarely and only once per name — so Click CSS keeps the wrapping and leaves the naming side to a `<style>` tag, the same place `@font-face` and `@keyframes` already live — an at-rule that wraps a nested block or its own declaration list is the one shape the `class` attribute has no room for. This applies to `anchor-name`, `anchor-scope`, `position-anchor`, `view-transition-name`, `animation-timeline`, `scroll-timeline-name`, `view-timeline-name`, `timeline-scope`, and the `scroll-timeline` / `view-timeline` shorthands.

Only the *declaration* moves. Values that reference a name still work inline, because the wrapping stops at `(`:

```html
<style>
  .card { anchor-name: --card }
</style>

<div class="card width=200px height=120px">Anchor</div>
<div class="position=fixed top=anchor(--card_bottom) left=anchor(--card_left) padding=8px">
  Tooltip
</div>
```

```css
.position\=fixed { position: fixed }
.top\=anchor\(--card_bottom\) { top: anchor(--card bottom) }
.left\=anchor\(--card_left\) { left: anchor(--card left) }
```

### Parentheses stop the value transforms

`_` and `=` are character aliases and apply everywhere, so you still write spaces with `_` inside a function. But nothing that reads the *value* reaches past a `(` — no operator spacing, no unit appending, no `var()` wrapping. Write those yourself:

```html
<html class="width=calc(100%_-_16px)">
```

```css
.width\=calc\(100\%_-_16px\) { width: calc(100% - 16px) }
```

This is what keeps hyphenated identifiers intact, since Click CSS never has to guess whether a `-` is a minus sign or part of a name:

```html
<html class="height=calc(100vh_-_var(--header-height)) width=calc(100%_-_env(safe-area-inset-left))">
```

The same rule is why a bare number inside parentheses keeps no unit — `calc(100%_-_16)` stays `calc(100% - 16)`, which CSS rejects. Add the unit: `calc(100%_-_16px)`.

---

## Shorthands

Click CSS ships with three categories of predefined shorthands. Value-only shorthands are the only ones parsed without requiring `:` or `=`.

```html
<html class="flex @dark@c=white">
```

```css
.flex { display: flex }
@media (prefers-color-scheme: dark) {
  .\@dark\@c\=white { color: white }
}
```

- [Properties](./packages/lib/click-css.js#L18): `w` → `width`, `h` → `height`, `c` → `color`, `d` → `display`, …

  A family shares one prefix — `bd` for borders, `br` for radii, `m` for margins, `t` for text. A member you reach for constantly gets its own anchor and becomes a family of its own, which is why `border-radius` is `br` rather than `bdr`, and its corners are `brtl` / `brtr` / `brbl` / `brbr`. Axis suffixes follow the convention every style-prop library settled on: `mx` / `my`, `px` / `py`.
- [Values](./packages/lib/click-css.js#L112): `flex`, `grid`, `block`, `absolute`, `relative`, …
- [Media conditions](./packages/lib/click-css.js#L133): `dark`, `sm`, `md`, `lg`, `xl`, `hover`, …

Numeric values for dimension properties (e.g. `border`, `width`, `gap`) automatically append `px`. Change [`default_unit`](./packages/lib/click-css.js#L149) to switch to `rem` or any other unit.

```html
<html class="w=100"><!-- width: 100px -->
```

Start a value with `~` and none of its numbers take the unit. Use it wherever bare numbers are not lengths:

```html
<html class="tab-size=~4"><!-- tab-size: 4, four characters wide -->
<html class="border-image-width=~2_3_4_5"><!-- border-image-width: 2 3 4 5, multiples of the border width -->
```

The marker goes straight after the `=`, ahead of the minus sign if the first value is negative. A number you write a unit on is never touched anyway, so the two still mix: `mask-border=~url(mask.png)_30_/_20px` keeps the slice bare and the width in `px`.

Two properties are excluded by name instead, because a bare number is the ordinary way to write them and getting it wrong is easy to miss: `line-height` (a multiple of the font size) and `stroke-width` (SVG user units). The grid line numbers in `grid-row-start` and friends are never matched to begin with. Adding `~` to any of these is harmless — it is read at the start of a value whether or not a unit was going to be appended.

Matching by name cannot know about a property CSS has not shipped yet, and `~` is the answer there too. Click CSS never needs to learn a new property name to style with it.

### Classes you did not write for Click CSS

Value shorthands are ordinary words, and every class on the page goes through the same parse. A class named exactly `row`, `column`, `wrap`, `flex`, `grid`, `block`, `inline`, `none`, `absolute`, `relative`, `fixed`, `static`, `sticky` or `isolate` gets the declaration whether you meant it or not — Bootstrap's `.row` picks up `flex-direction: row`. Rename the clash, or delete the entry from [`shorthand_for_values`](./packages/lib/click-css.js#L112).

A class that merely *contains* one compiles to an invalid rule, and is left alone on purpose:

```css
.wrapper { wrapper }            /* class="wrapper", contains "wrap" */
.grid-item { grid-item }
.fixed-header { fixed-header }
```

Browsers drop invalid declarations, so nothing renders differently — it only costs a few bytes in the sheet. Names with no shorthand inside them (`container`, `sidebar`, `card`, `col-6`) are never touched.

---

## CSS Reset

Click CSS injects a built-in reset at startup. Customize it via [`pure_style`](./packages/lib/click-css.js#L7).

---

## Performance

Click CSS achieves engine-level performance through three design choices:

**1. Staged regex pipeline**
CSS parsing is composed as a series of O(n) string transformations. Each stage runs through the browser regex engine natively, bypassing the JS interpreter entirely. Every stage is a literal alternation anchored to `^`, `/` or `;`, which the engine prefilters — replacing the 90-way property alternation with a generic match plus a hash lookup measures *slower*, not faster.

**2. Dual `MutationObserver`**
Class attribute mutations directly iterate `classList`. Subtree mutations serialize the changed root to `outerHTML` and extract all class tokens in a single regex pass — no recursive DOM walking, no `querySelectorAll`. Over 12 000 elements that is 3.4 ms versus 4.9 ms for `querySelectorAll` and 4.6 ms for a `TreeWalker`.

**3. Whole-sheet `textContent`**
New rules are appended and the entire `<style>` text is rewritten, rather than spliced in with `insertRule`. This is the counter-intuitive one: at 4 000 rules a full rewrite costs 0.7 ms against 2.9 ms for `insertRule`, and it stays ahead even when only a single rule is added. Style recalculation dominates either way, and only `insertRule` adds cost on top of it.

**4. Parse-phase execution**
A `<script>` in `<head>` without `defer` or `type="module"` runs during HTML parsing. Initial CSS generation finishes before layout, absorbed into the browser's first style calculation — no extra reflow or repaint.

Runtime overhead is minimal: tokens are deduplicated with a `Set`, and the `<style>` element is only updated when new tokens appear.

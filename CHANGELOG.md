# Changelog

## 1.1.0

### Breaking

- **`calc()` no longer inserts operator spacing.** Write the spaces yourself with `_`:
  `calc(100%-16px)` → `calc(100%_-_16px)`. The old form now reaches CSS unchanged and is
  rejected silently, so audit any class containing `calc(` without `_`.
- **Parentheses stop the value transforms.** Neither the default unit nor `var()` wrapping
  reaches past a `(`: `calc(100%_-_16)` stays `calc(100% - 16)`, and `calc(100%_-_--gap)`
  stays `calc(100% - --gap)`. Write `16px` and `var(--gap)` yourself. Previously a `--name`
  after a space or comma was wrapped even inside a function, so the first argument of
  `rgb(--r,--g,--b)` was treated differently from the other two. The `_` and `=` aliases are
  character-level and still apply everywhere, inside parentheses included.
- **Safari 13.1+ → Safari 16.4+.** The property matcher now uses regex lookbehind. Chrome
  and Firefox are effectively unchanged (80 and 74 → 78), since optional chaining and
  `matchAll` already set the floor there.
- **Property shorthands were reorganised.** A family now shares one prefix, and a member you
  reach for constantly gets its own anchor — which is why `border-radius` stays `br` while
  its corners moved under it. Rename these:

  | old | new | property |
  |---|---|---|
  | `bblr` | `brbl` | border-bottom-left-radius |
  | `bbrr` | `brbr` | border-bottom-right-radius |
  | `btlr` | `brtl` | border-top-left-radius |
  | `btrr` | `brtr` | border-top-right-radius |
  | `mi` | `mx` | margin-inline |
  | `pi` | `px` | padding-inline |
  | `tt` | `tr` | transition |

  `tt` now means `text-transform`, which leaves the text family reading `ta` `td` `ts` `tt`
  `tw`, and `tf` / `tr` paired for transform and transition.

  Five shorthands were dropped because the abbreviation did not pay for itself — `at`
  (accent-color), `cv` (content-visibility), `ji` (justify-items), `pc` (place-content) and
  `v` (visibility). Nothing is lost: spell the property out, as you would any property
  without a shorthand.

Giving up automatic spacing is what makes hyphenated identifiers survive. Previously every
`-` inside `calc()` was treated as a minus sign, so `calc(100vh-var(--header-height))` came
out as `calc(100vh - var(- - header - height))`.

### Fixed

- `line-height`, `grid-row-start/end` and `grid-column-start/end` no longer get `px`
  appended. `lh=1.5` produced `line-height:1.5px`.

  Audit any bare number you wrote for these. Code that worked around the old behaviour
  changes meaning rather than breaking loudly: `lh=24` used to be `line-height:24px` and is
  now `line-height:24`, twenty-four times the font size.
- `stroke-width` no longer gets `px` either. It takes a bare `<number>` meaning user units,
  so `stroke-width=1.5` used to render at the wrong thickness in any SVG whose `viewBox` is
  scaled. `tab-size`, `border-image-width` and `mask-border-width` take a bare number too and
  are handled by the new `~` marker rather than by name. A name rule earns its bytes only
  where the property is common enough, or the wrong result quiet enough, that people would be
  caught by it: a mis-scaled `stroke-width` draws icons subtly wrong, while a 4px tab stop is
  obvious the moment you look at it.
- Numbers inside function arguments are left alone. `bd=1_solid_rgb(0_0_0_/_.2)` produced
  `rgb(0 0px 0px / .2)`.
- A `/` inside quotes, `()` or `[]` no longer splits selector from style.
  `[href='/docs']/c=red` produced `[href='{docs']/color:red}`.
- Class tokens collected while the page is parsing are decoded before use. Attribute
  serialization escapes `&`, `<`, `>`, `"` and U+00A0, so `@sm&dark@c=red` and
  `@(400px<=width<=700px)@w=100` were broken on first load and only worked after the class
  attribute was mutated.
- Quoted text is no longer treated as a block, so `ct='('` and `ct="it's"` are kept instead
  of being dropped. An unclosed `[` is now caught.
- A selector-shaped class with no `/` no longer loses its last character, which could leave
  the stylesheet open and swallow every rule after it.
- The VSCode extension emitted unescaped `<` into its hover preview, breaking the rendering
  for range queries.
- The extension's hover preview lost its colours from the first `;` inside a value onwards.
  It re-parsed the finished CSS with `/(?<=^|;)(.+?):(.+?)(?=;|$)/`, so `ct='a;b'` previewed
  as `content: 'a` followed by uncoloured `;b'`, and a data URI split at its own `;` and
  showed `base64,AAA);color` as a property name. Declarations are now separated by the same
  quote- and bracket-aware scan the rest of the pipeline uses, which also replaces the
  `span>;<span` patch that added the space after each `;`.
- The extension's hover preview dropped the `&` when a media query carried plain declarations
  rather than a selector, so `@max-width=820px@gtr=50px` previewed as a rule with no subject
  at all: `@media (max-width:820px) { { grid-template-rows: 50px } }`.
- The extension's syntax highlighting drew the selector underline at the first `/`, so
  `[href='/docs']/color=red` was underlined as far as `[href='/`. It now reuses the same
  scan the library does. An escaped `\=` is no longer underlined as a separator either.
- The extension only activated for HTML, Svelte, Vue, JSX and TSX, even though its parser
  finds a `class="..."` in anything HTML-shaped. It now activates on `onStartupFinished`, so
  Astro, PHP, Markdown and template languages such as Handlebars, Liquid, Twig, ERB and
  Blade work as well — as does markup inside a JS or TS template literal.
- The extension declared `engines.vscode: ^1.45.0` while calling `MarkdownString.supportHtml`,
  an API added in 1.62 — installing on an older editor would have failed at runtime. The
  floor is now `^1.62.0`, and `@types/vscode` is pinned exactly so the two cannot drift
  apart again.

### Added

- `~` at the start of a value leaves its numbers without the default unit: `w=~100` is
  `width: 100`, and `border-image-width=~2_3_4_5` is `border-image-width: 2 3 4 5`. Whether
  numbers are lengths is a fact about the property rather than about each number, so the
  marker is written once. The unit is chosen by matching the property name, which cannot know
  about a property CSS has not shipped yet — `~` is how you tell it that a number is not a
  length, so styling a brand new property never waits on a Click CSS release. It is read
  whether or not a unit was going to be appended, so writing it on `line-height` or
  `stroke-width` is harmless rather than a broken declaration.
- `\_` and `\=` escape to a literal `_` and `=` — for file paths, query strings and quoted
  text: `bgi=url(/img/hero\_bg.png?v\=2)`.
- Media Queries Level 4 range syntax: `@(width>=640px)@w=100`,
  `@(400px<=width<=700px)@w=100`.
- The default unit now applies to `inline-size` / `block-size`, `border-inline` /
  `border-block`, `inset-inline` / `inset-block` and their longhands. `bdi=1_solid_red`
  produced `border-inline:1 solid red`.
- Shorthands for `min-width`, `max-width`, `min-height` and `max-height` — `miw`, `maw`,
  `mih`, `mah`. Every style-prop library surveyed has these; Click CSS was the only one
  without them. Also `my` / `py` for `margin-block` / `padding-block`, the missing halves of
  `mx` / `px`, and `tt` for `text-transform`.
- `pnpm build` — minifies with terser, writes both `packages/lib/min.js` and `docs/min.js`,
  and fails if the version stamp disagrees with `package.json`.
- The build is published on GitHub Pages at `https://artxe.github.io/click-css/min.js`, which
  is enough to try the library in a `<script>` tag without downloading anything. It is not a
  release channel: the URL carries no version, so it serves whatever `main` last built. Copy
  the file into your own project before you ship.
- `pnpm test` — 288 tests over the real `click-css.js`, run through both collection paths,
  plus parity against the VSCode extension's copy of the pipeline.

## 1.0.0

- Renamed to Click CSS.

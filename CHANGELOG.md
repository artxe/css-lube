# Changelog

## 1.1.0

### Breaking

- **`calc()` no longer inserts operator spacing.** Write the spaces with `_`:
  `calc(100%-16px)` → `calc(100%_-_16px)`. The old form reaches CSS unchanged and is rejected
  silently, so audit every class containing `calc(` without `_`. This is what lets hyphenated
  identifiers survive: `calc(100vh-var(--header-height))` used to become
  `calc(100vh - var(- - header - height))`.
- **Parentheses stop the value transforms.** Neither the default unit nor `var()` wrapping
  reaches past a `(`: `calc(100%_-_16)` stays `calc(100% - 16)` and `calc(100%_-_--gap)` stays
  `calc(100% - --gap)` — write `16px` and `var(--gap)` yourself. Previously a `--name` after a
  space or comma was wrapped even inside a function, so `rgb(--r,--g,--b)` treated its first
  argument differently from the other two. The `_` and `=` aliases are character-level and
  still apply everywhere, parentheses included.
- **Safari 13.1+ → Safari 16.4+.** The property matcher now uses regex lookbehind. Chrome stays
  at 80; Firefox moves 74 → 78, since optional chaining and `matchAll` already set the floor.
- **Property shorthands were reorganised.** A family shares one prefix, and a member you reach
  for constantly keeps its own anchor — `border-radius` stays `br` while its corners move under
  it. Rename these:

  | old | new | property |
  |---|---|---|
  | `bblr` | `brbl` | border-bottom-left-radius |
  | `bbrr` | `brbr` | border-bottom-right-radius |
  | `btlr` | `brtl` | border-top-left-radius |
  | `btrr` | `brtr` | border-top-right-radius |
  | `mi` | `mx` | margin-inline |
  | `pi` | `px` | padding-inline |
  | `tt` | `tr` | transition |

  `tt` now means `text-transform`, so the text family reads `ta` `td` `ts` `tt` `tw`, and
  `tf` / `tr` pair transform with transition. Five shorthands were dropped — spell the property
  out: `at` accent-color, `cv` content-visibility, `ji` justify-items, `pc` place-content,
  `v` visibility.

### Fixed

- `line-height`, `stroke-width`, `grid-row-start/end` and `grid-column-start/end` no longer get
  `px` appended. `lh=1.5` produced `line-height:1.5px`; `stroke-width=1.5` rendered at the wrong
  thickness in any SVG with a scaled `viewBox`. Audit bare numbers written for these — the
  meaning changes rather than breaking loudly: `lh=24` was `line-height:24px` and is now
  `line-height:24`, twenty-four times the font size. `tab-size`, `border-image-width` and
  `mask-border-width` take a bare number too and use the new `~` marker instead of a name rule.
- Numbers inside function arguments are left alone. `bd=1_solid_rgb(0_0_0_/_.2)` produced
  `rgb(0 0px 0px / .2)`.
- A `/` inside quotes, `()` or `[]` no longer splits selector from style.
  `[href='/docs']/c=red` produced `[href='{docs']/color:red}`.
- Class tokens collected while the page is parsing are decoded before use. Attribute
  serialization escapes `&`, `<`, `>`, `"` and U+00A0, so `@sm&dark@c=red` and
  `@(400px<=width<=700px)@w=100` only worked after the class attribute was mutated.
- Quoted text is no longer treated as a block, so `ct='('` and `ct="it's"` are kept. An
  unclosed `[` is now caught.
- A selector-shaped class with no `/` no longer loses its last character, which could leave the
  stylesheet open and swallow every rule after it.
- VSCode extension: the hover preview emitted unescaped `<`, breaking range queries.
- VSCode extension: the hover preview lost its colours from the first `;` inside a value, so
  `ct='a;b'` and data URIs previewed wrong. Declarations are now separated by the same quote-
  and bracket-aware scan the library uses.
- VSCode extension: the hover preview dropped the `&` when a media query carried plain
  declarations — `@max-width=820px@gtr=50px` previewed as
  `@media (max-width:820px) { { grid-template-rows: 50px } }`.
- VSCode extension: the selector underline stopped at the first `/`, so `[href='/docs']/color=red`
  was underlined as far as `[href='/`. An escaped `\=` is no longer underlined as a separator.
- VSCode extension: activates on `onStartupFinished` instead of five languages, so Astro, PHP,
  Markdown, Handlebars, Liquid, Twig, ERB, Blade and markup inside JS/TS template literals work.
- VSCode extension: `engines.vscode` was `^1.45.0` while calling `MarkdownString.supportHtml`
  (added in 1.62). The floor is now `^1.62.0`, with `@types/vscode` pinned exactly.

### Added

- `~` at the start of a value leaves its numbers without the default unit: `w=~100` is
  `width: 100`, `border-image-width=~2_3_4_5` is `border-image-width: 2 3 4 5`. Written once per
  value, and read whether or not a unit was going to be appended, so it is harmless on
  `line-height`. It also lets a brand-new CSS property be styled without waiting on a release.
- `\_` and `\=` escape to a literal `_` and `=`: `bgi=url(/img/hero\_bg.png?v\=2)`.
- Media Queries Level 4 range syntax: `@(width>=640px)@w=100`, `@(400px<=width<=700px)@w=100`.
- The default unit applies to `inline-size` / `block-size`, `border-inline` / `border-block`,
  `inset-inline` / `inset-block` and their longhands. `bdi=1_solid_red` produced
  `border-inline:1 solid red`.
- Shorthands `miw`, `maw`, `mih`, `mah` (min/max width and height), `my` / `py`
  (`margin-block` / `padding-block`) and `tt` (`text-transform`).
- `pnpm build` — terser, writes `packages/lib/min.js` and `docs/min.js`, fails if the version
  stamp disagrees with `package.json`.
- `pnpm test` — 288 tests over the real `click-css.js` through both collection paths, plus
  parity against the VSCode extension's copy of the pipeline.
- The build is published at `https://artxe.github.io/click-css/min.js` for trying the library in
  a `<script>` tag. Not a release channel: the URL carries no version and serves whatever `main`
  last built. Copy the file into your project before you ship.

## 1.0.0

- Renamed to Click CSS.

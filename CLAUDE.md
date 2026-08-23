# Click CSS — working notes

Runtime library that compiles class tokens into CSS in the browser. `packages/lib/click-css.js`
is the entire library: one top-level block, no imports, no build step for consumers.
[README.md](./README.md) is the user spec; the cheat sheet below usually suffices.

## Layout

pnpm workspace, every package at 1.1.0.

| path | contents |
|---|---|
| `packages/lib` | `click-css.js` (source of truth), `click-css.d.ts`, built `min.js`, `build.mjs` |
| `packages/test` | 288 node:test cases; names and comments are Korean — match that |
| `packages/vsce` | VSCode extension `Artxe.intellisense-click-css` |
| `docs` | playground on GitHub Pages; `index.html` is styled with Click CSS itself, `app.css` is only `@keyframes`. The preview is a sandboxed `srcdoc` iframe with its own `min.js` (two frames alternate to avoid flicker); it reports the compiled CSS by `postMessage`, and `THEME` reaches it through a `localStorage` shim because the sandbox has no storage |

```bash
pnpm test    # node --test over the real source, both collection paths + vsce parity
pnpm build   # terser → packages/lib/min.js and docs/min.js, version stamp checked
pnpm lint    # tsc (checkJs, strict) then eslint --fix
```

Check a token from node: in `packages/test`, `import { compile } from "./dom.mjs"` and
`compile("w=100")` returns the rule the real source emits.

## click-css.js map

README.md links these by line number — fix those links if a table moves.

| line | what |
|---|---|
| 7 | `pure_style` — built-in reset, head of the sheet |
| 18 | `shorthand_for_properties` (90) |
| 112 | `shorthand_for_values` (17) |
| 133 | `shorthand_for_media_condition` (10) |
| 147 | `replace_default_unit_inner_regex` — per-number matcher, skips `(…)` |
| 148 | `replace_default_unit_regex` — property matcher; lookbehinds exclude `line-height`, `stroke-width` |
| 149 | `default_unit = "px"` |
| 489 | `setAttribute("click", "v1.1.0")` — the version stamp |

`compile_style` gates on `check_has_value_regex` and `check_is_open`, then dispatches on the
first char: `-`/`a`–`z` → `compile_raw`, `@` → `compile_media`, else `compile_special`.
`parse_value` runs `_` alias → `=` alias → shorthand → default unit → `var()`, in that order.
Sheet = `pure_style + media_style`, so every media rule follows every plain rule; within each,
rules sit in first-appearance order of the token, which decides ties between equal selectors.

## Invariants

- `click` is a **bare global**. Never make `click-css.js` a module or add `import`/`export`:
  strict mode throws and the rebuild hook disappears. `click-css.d.ts` declares it.
- The three shorthand Maps are duplicated in `packages/vsce/package.json` under
  `click-css.custom.*`. Change one, change the other, or `parity.test.mjs` fails.
- `packages/vsce/src/helper/compile_style.js` is a second copy of the pipeline for hover
  previews. `parity.test.mjs` compares declarations and at-rule preludes only; selector
  notation differs on purpose (the extension writes `&` for the class).
- A version bump touches `package.json` at the root and in all three packages **and** the
  `setAttribute("click", "v…")` stamp, then `pnpm build` regenerates both `min.js`.
  `build.mjs` throws if stamp and `package.json` disagree.
- Browser floor Chrome 80 / Firefox 78 / Safari 16.4, set by optional chaining, `matchAll` and
  the lookbehind in the property matcher. Raising it is a breaking change.
- Value transforms (unit, `var()`, operator spacing) never reach past a `(`. That is what keeps
  `--header-height` and friends intact.

## Style

Tabs, no semicolons, `snake_case`, `let` everywhere (`prefer-const` off), JSDoc types under
`checkJs` + `strict`. Regex constants carry the pattern in a JSDoc code fence — keep it in sync.
eslint-plugin-lube, `lube/pretty-sequence` at maxLength 50.

## Grammar cheat sheet

| token | meaning |
|---|---|
| `_` / `=` | space / `:` — character-level, apply everywhere including inside `()` |
| `\_` / `\=` | literal `_` / `=` |
| trailing `!` | one `[class]` prefix per `!` |
| `<selector>/<style>` | first top-level `/` splits; `/` inside `'" () []` belongs to the selector |
| `@<query>@<style>` | `@media` prepended; `@@` for a raw at-rule |
| `&` / `<key>=<value>` in a query | ` and ` / `(<key>:<value>)`; `>=` and `<=` are left alone |
| `--name` in a value | `var(--name)` after `:`, space or comma — outside `()` only |
| `~` starting a value | skip the default unit for every number in it |
| `localStorage.THEME` | `DARK`/`LIGHT` rewrites `prefers-color-scheme:dark`; call `click()` to rebuild |

`line-height` and `stroke-width` are excluded from the default unit by name; grid line numbers
never match. Everything else that takes a bare number uses `~`.

# Intellisense Click CSS
![Intellisense Click CSS](https://raw.githubusercontent.com/Artxe/click-css/main/assets/intellisense.gif)

Editor support for [Click CSS](https://github.com/Artxe/click-css), which lets you write CSS — declarations, selectors and media queries — in the `class` attribute, compiled in the browser with no build step.

- **Hover preview** — the CSS a class compiles to, without leaving the markup
- **Syntax highlighting** — media query, selector, property and value underlined apart
- **Autocomplete** — shorthands for properties, values and media conditions

Works in any file the parser can find a `class="..."` in — HTML, Svelte, Vue, Astro, JSX, TSX, PHP, Markdown, and template languages such as Handlebars, Liquid, Twig, ERB and Blade. Markup inside a JavaScript or TypeScript template literal is picked up too.

If your project edits the shorthand tables in `click-css.js`, mirror them under the `click-css.custom.shorthand_for_properties`, `click-css.custom.shorthand_for_values` and `click-css.custom.shorthand_for_media_condition` settings so previews and completions match.

Requires VS Code 1.62 or newer.
```bash
winget upgrade --id Microsoft.VisualStudioCode
```

[Documentation](https://github.com/Artxe/click-css#readme) · [Changelog](https://github.com/Artxe/click-css/blob/main/CHANGELOG.md)

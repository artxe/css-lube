# Intellisense Click CSS
![Intellisense Click CSS](https://raw.githubusercontent.com/Artxe/click-css/main/assets/intellisense.gif)

Editor support for [Click CSS](https://github.com/artxe/click-css), which lets you write CSS — declarations, selectors and media queries — in the `class` attribute, compiled in the browser with no build step.

- **Hover preview** — see the CSS a class compiles to, without leaving the markup
- **Syntax highlighting** — media query, selector, property and value are underlined apart
- **Autocomplete** — shorthands for properties, values and media conditions, all editable in settings

Works in any file the parser can find a `class="..."` in — HTML, Svelte, Vue, Astro, JSX, TSX, PHP, Markdown, and template languages such as Handlebars, Liquid, Twig, ERB and Blade. Markup inside a JavaScript or TypeScript template literal is picked up too.

Requires VS Code 1.62 or newer.
```bash
winget upgrade --id Microsoft.VisualStudioCode
```

[Changelog](https://github.com/Artxe/click-css/blob/main/CHANGELOG.md)

# bewf start

A minimal dark browser homepage for quick study links and distraction-free DuckDuckGo search.

## Features

- Sticky DuckDuckGo search bar
- Dropdown sections for Media, Microsoft, Google Workspace, and AI tools
- YouTube and YouTube Music visible first by default
- One section open at a time
- Last opened section remembered with localStorage
- Keyboard shortcuts for fast navigation
- Compact black, grey, and white visual style
- Static HTML, CSS, and JavaScript only

## Keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| `/` | Focus the search bar |
| `1` | Open Media |
| `2` | Open Microsoft |
| `3` | Open Google Workspace |
| `4` | Open AI |
| `Esc` | Close all sections and blur search |

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure, link sections, metadata |
| `style.css` | Dark visual design, dropdowns, cards, responsive layout |
| `script.js` | Search behaviour, dropdown state, shortcuts, localStorage |
| `icons/` | SVG icons used by the link cards |

## GitHub Pages

The live homepage should be available at:

```text
https://bewfordq.github.io/browser-homepage/
```

If it does not update immediately after a push, wait a minute and refresh the page. GitHub Pages can take a short time to rebuild.

## Firefox new tab setup

Firefox does not allow a custom new-tab URL directly in normal settings. The easiest method is to use a new-tab override extension and set the URL to:

```text
https://bewfordq.github.io/browser-homepage/
```

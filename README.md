# DeHTML

[![GitHub Pages](https://github.com/Aaqibhafeezkhan/DeHTML/actions/workflows/deploy.yml/badge.svg)](https://github.com/Aaqibhafeezkhan/DeHTML/actions/workflows/deploy.yml)

DeHTML is a browser-based toolkit for working with HTML and related web code. It brings common text and markup tasks together in one lightweight React application.

## Tools

| Tool | What it does |
| --- | --- |
| **Strip Tags** | Extracts readable text from pasted HTML markup. The result also displays character, word, and line counts. |
| **Encode / Decode** | Converts text to HTML entities or decodes HTML markup/entities back to text. |
| **Diff Viewer** | Compares two text inputs line by line and marks equal, removed, and added lines. |
| **Formatter** | Adds indentation and line breaks to pasted HTML to make its structure easier to read. |
| **Minifier** | Reduces HTML, CSS, or JavaScript text by removing comments and/or whitespace using lightweight text transformations. |
| **Previewer** | Renders pasted HTML, CSS, and JavaScript in a sandboxed iframe with a live preview. |

## Examples

### Strip HTML tags

Input:

```html
<p>Hello <strong>world</strong>!</p>
```

Output:

```text
Hello world!
```

### Encode and decode entities

Encode:

```text
Input:  <div>A & B</div>
Output: &lt;div&gt;A &amp; B&lt;/div&gt;
```

Decode:

```text
Input:  &lt;strong&gt;Hello&lt;/strong&gt;
Output: Hello
```

### Compare text

The Diff Viewer compares corresponding lines in the original and modified inputs. It prefixes unchanged lines with two spaces, removed lines with `-`, and added lines with `+`.

Original:

```text
same
old
```

Modified:

```text
same
new
extra
```

Result:

```diff
  same
- old
+ new
+ extra
```

### Format HTML

Input:

```html
<div><p>Hello</p><img src="example.png"></div>
```

The Formatter adds indentation and line breaks to make the markup easier to inspect. Its output is a readability aid, not a standards-compliant HTML parser or formatter.

### Minify code

The Minifier offers separate HTML, CSS, and JavaScript modes. For example, HTML comments are removed and whitespace is collapsed:

```html
<!-- greeting -->
<div>  <span>Hello</span> </div>
```

```html
<div><span>Hello</span></div>
```

### Preview HTML, CSS, and JavaScript

The Previewer updates an iframe as you edit the input. For example, you can paste markup with a style block and a script:

```html
<h1 id="title">Hello</h1>
<style>
  h1 { color: hotpink; }
</style>
<script>
  document.getElementById('title').textContent = 'Hello from JavaScript!';
</script>
```

## Important behavior and limitations

- **Input:** The tools work with text pasted into their editors. The current application does not provide file upload or import workflows.
- **HTML parsing:** Strip Tags and Encode / Decode use the browser's DOM APIs. Their output follows browser parsing and text extraction behavior; they are not HTML validators.
- **Formatting:** The Formatter uses lightweight tag-based indentation. It does not implement the full HTML parsing specification, so complex or malformed markup may not be formatted as expected.
- **Diffing:** The Diff Viewer compares lines at matching positions. It is a simple line-by-line comparison, not a semantic or alignment-aware diff algorithm.
- **Minification:** The HTML, CSS, and JavaScript modes use regular-expression-based text transformations. They are intentionally lightweight and are not substitutes for production-grade, syntax-aware minifiers. In particular, whitespace or comment removal can change content or behavior in some inputs; review the result before using it.
- **Preview security:** Previewed markup is not sanitized. Scripts in the input execute inside an iframe with the `allow-scripts` sandbox permission. The sandbox does not grant same-origin access, but this tool is not a security boundary for untrusted content or a general-purpose HTML sanitizer. Only preview content you trust.
- **No validation guarantees:** A successful transformation does not mean the input is valid, accessible, secure, or production-ready.

## Getting started

### Requirements

- Node.js 22
- npm

### Install dependencies

```bash
git clone https://github.com/Aaqibhafeezkhan/DeHTML.git
cd DeHTML
npm install
```

### Start the development server

```bash
npm run dev
```

Vite prints the local development URL in the terminal.

### Build for production

```bash
npm run build
```

The production build is generated in the `dist/` directory.

## Testing and quality checks

Run the test suite:

```bash
npm test
```

Run tests with V8 coverage:

```bash
npm run test:coverage
```

Run ESLint:

```bash
npm run lint
```

## Deployment

DeHTML is configured for GitHub Pages. The Vite base path is set to `/DeHTML/` in `vite.config.js`.

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the application and deploys the `dist/` directory to GitHub Pages when changes are pushed to `main`. It can also be started manually from the Actions tab.

## Contributing

Contributions are welcome, including focused bug fixes, tests, documentation improvements, and ideas for new tools.

1. Check the [open issues](https://github.com/Aaqibhafeezkhan/DeHTML/issues) before starting work.
2. For a larger change, discuss the scope in the relevant issue first.
3. Read [CONTRIBUTING.md](CONTRIBUTING.md) for setup, checks, and pull request guidance.

You can also [report a bug](https://github.com/Aaqibhafeezkhan/DeHTML/issues/new?template=bug_report.yml) or [request a feature](https://github.com/Aaqibhafeezkhan/DeHTML/issues/new?template=feature_request.yml).

## Legacy version

The previous vanilla JavaScript implementation remains available in the `legacy/` directory and is linked from the application footer.

## License

DeHTML is released under the [MIT License](LICENSE).

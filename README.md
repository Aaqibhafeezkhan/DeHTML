# DeHTML Studio

[![CI](https://github.com/aaqib-hafeez-khan-in/DeHTML/actions/workflows/ci.yml/badge.svg)](https://github.com/aaqib-hafeez-khan-in/DeHTML/actions/workflows/ci.yml) [![Coverage](./.github/coverage-badge.svg)](https://github.com/aaqib-hafeez-khan-in/DeHTML/actions/workflows/ci.yml)

A modern, fast, and secure toolkit for HTML manipulation built with React and Vite. Experience a clean, professional interface with powerful built-in tools.

## Features

- **Strip HTML Tags**: Instantly extract plain text from complex HTML content.
- **Encode / Decode Entities**: Easily convert special characters to HTML entities and back.
- **Diff Viewer**: Compare two blocks of text or code line-by-line.
- **Formatter**: Clean up and beautify messy HTML code.
- **Minifier**: Remove comments and collapse whitespace in HTML, CSS, or JS.
- **Previewer**: Render your markup live in a sandboxed iframe.

### Tool examples

**Strip Tags** — tags removed, plain text extracted:

```text
Input:  <p>Hello <b>World</b></p>
Output: Hello World
```

**Encode / Decode** — entities have two directions:

```text
Encode: <div>A & B</div>              ->  &lt;div&gt;A &amp; B&lt;/div&gt;
Decode: &lt;strong&gt;Hello&lt;/strong&gt;  ->  <strong>Hello</strong>
```

**Diff Viewer** — line-by-line comparison; removed lines are prefixed with `- `, added lines with `+ `. Original `same\nold` vs modified `same\nnew\nextra`:

```text
same
- old
+ new
+ extra
```

**Formatter** — messy HTML is re-emitted indented, no changes to tags themselves:

```html
<div><p>Hello</p><img src="x"></div>
```

Result:

```html
<div>
  <p>Hello</p>
  <img src="x">
</div>
```

**Minifier** — comments removed and whitespace collapsed (in HTML mode all whitespace, including inside text, collapses to single spaces). Separate modes handle CSS and JS:

```text
Input:  <div>  <!-- comment --> <span> hi </span> </div>
Output: <div><span> hi </span></div>
```

**Previewer** — the editor's HTML, CSS, and JS are rendered live in a sandboxed iframe. Script and style tags execute inside the preview; they are not sanitized, but the iframe sandbox (scripts allowed, same-origin not) keeps them isolated from the host page:

```html
<h1>Hello</h1>
<style>
  h1 { color: hotpink; }
</style>
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the local development server:

```bash
npm run dev
```

### Production Build

To structure the application for production, run:

```bash
npm run build
```

The output will be generated in the `dist` directory, fully optimized and ready to deploy to GitHub Pages.

## Deployment to GitHub Pages

The application is pre-configured for GitHub pages deployment (`base: '/DeHTML/'` in `vite.config.js`).

1. Ensure the `dist` folder is correctly generated.
2. Push your code to your repository.
3. Configure your GitHub Pages settings to use **GitHub Actions** as the source.

## Testing

This project uses Vitest and React Testing Library for unit tests and V8 coverage reporting.

Run the tests:

```bash
npm test
```

Run the tests with coverage:

```bash
npm run test:coverage
```

Every CI run publishes the coverage report as a downloadable artifact and displays Statements, Branches, Functions, and Lines coverage in the GitHub Actions job summary. Successful `main` runs also update the coverage badge above automatically.

## Contributing

DeHTML welcomes focused bug fixes, tests, documentation improvements, and new tool ideas. See [CONTRIBUTING.md](CONTRIBUTING.md) for local setup, checks, and pull request guidance. Use the [open issues](https://github.com/Aaqibhafeezkhan/DeHTML/issues) to find work, or open a [bug report](https://github.com/Aaqibhafeezkhan/DeHTML/issues/new?template=bug_report.yml) or [feature request](https://github.com/Aaqibhafeezkhan/DeHTML/issues/new?template=feature_request.yml).

## License

DeHTML is distributed under the [MIT License](LICENSE).

## Legacy Support

The previous vanilla JavaScript implementation is preserved in the `/legacy` folder and remains accessible via the `/legacy/index.html` path in production.

# Contributing to DeHTML

Thanks for considering a contribution. DeHTML is a browser-based toolkit for working with HTML, including stripping tags, encoding and decoding entities, comparing text, formatting, minifying, and previewing markup.

## Get started

You will need Node.js and npm.

```bash
git clone https://github.com/Aaqibhafeezkhan/DeHTML.git
cd DeHTML
npm install
npm run dev
```

## Before opening a pull request

Run the checks relevant to your change:

```bash
npm run lint
npm test
npm run build
```

If you change test coverage, you can also run `npm run test:coverage`.

## Find something to work on

- Check the open issues before starting work.
- Issues labelled `up-for-grabs` or `good first issue` are intended as approachable starting points when available.
- If you want to work on a larger change, comment on the issue first so the scope can be agreed before you invest time.
- For a new idea, open a feature request and describe the problem it solves.

## Pull request guidelines

- Keep each pull request focused on one issue or one closely related change.
- Prefer small, reviewable changes over unrelated refactoring.
- Add or update tests when behavior changes.
- Update documentation when usage or behavior changes.
- Link the related issue in the pull request description.
- Explain the user-visible change and the checks you ran.
- Be respectful and constructive in review discussions.

## Code style

Follow the existing patterns in the codebase and the ESLint configuration. Avoid unrelated formatting changes.

## Reporting a bug

Use the bug report issue form and include steps to reproduce, expected behavior, actual behavior, and relevant browser or environment details. Please remove secrets and private data from examples.

## License

By submitting a contribution, you agree that it may be distributed under the repository's MIT License.

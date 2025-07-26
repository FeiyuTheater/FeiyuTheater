# Markdown Linting Setup

This repository uses [markdownlint](https://github.com/DavidAnson/markdownlint) to ensure consistent formatting across all markdown files (`.md` and `.markdown`).

## What Gets Checked

The linting runs automatically on:
- All pushes to `main` and `master` branches
- All pull requests targeting `main` and `master` branches

### Files Included
- All `.md` and `.markdown` files in the repository

### Files Excluded
- `_site/**` - Jekyll build output directory

## Rules Enforced

Only two specific formatting rules are enforced:

- **No trailing whitespace** (MD009) - Lines cannot end with spaces or tabs
- **Files must end with newline** (MD047) - All files must end with exactly one newline character

All other markdown linting rules are disabled to keep the checks minimal and focused.

## Configuration

The rules are defined in `.markdownlint.json` at the repository root.

## Running Locally

To check markdown files locally, install markdownlint-cli:

```bash
npm install -g markdownlint-cli
```

Then run:

```bash
markdownlint "**/*.md" "**/*.markdown" --config .markdownlint.json --ignore "_site/**"
```

## Fixing Issues

Most issues can be fixed automatically:

```bash
markdownlint "**/*.md" "**/*.markdown" --config .markdownlint.json --ignore "_site/**" --fix
```

Common fixes needed:
- Remove trailing spaces from line ends
- Add a newline at the end of files
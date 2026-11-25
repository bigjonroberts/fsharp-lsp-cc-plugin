# F# Language Support for Claude Code

A Claude Code plugin that provides F# language intelligence via
[FsAutoComplete](https://github.com/ionide/FsAutoComplete) (FSAC).

## Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download) (6.0 or later)
- FsAutoComplete installed as a global tool:

  ```bash
  dotnet tool install --global fsautocomplete
  ```

  Verify the installation:

  ```bash
  fsautocomplete --version
  ```

## Installation

From within Claude Code, add this repo as a marketplace and install the plugin:

```
/plugin marketplace add bigjonroberts/fsharp-lsp-cc-plugin
/plugin install fsharp-lsp@fsharp-lsp
```

Or from the shell:

```bash
claude plugin marketplace add bigjonroberts/fsharp-lsp-cc-plugin
claude plugin install fsharp-lsp@fsharp-lsp
```

For local development/testing:

```bash
claude --plugin-dir /path/to/fsharp-lsp-cc-plugin
```

## Features

Language intelligence for `.fs`, `.fsx`, and `.fsi` files:

- **Diagnostics** — Compiler errors, warnings, and linter suggestions
- **Completions** — Code completion with keyword support
- **Go to Definition** — Navigate to symbol definitions
- **Find References** — Locate all references to a symbol
- **Hover** — Type information and documentation
- **Code Actions** — Quick fixes (add missing opens, generate stubs, simplify names, etc.)
- **Code Lenses** — Reference counts on symbols
- **Rename** — Symbol renaming across files
- **Document Symbols** — Outline view of the current file
- **Formatting** — Code formatting via Fantomas

## Configuration

The plugin ships with `AutomaticWorkspaceInit: true`, so FSAC will
automatically discover and load `.sln` and `.fsproj` files in your workspace.
Open Claude Code at the root of your F# project or solution for best results.

### Enabled Analyzers

| Setting                      | Description                                  |
| ---------------------------- | -------------------------------------------- |
| `Linter`                     | FSharpLint integration                       |
| `UnusedOpensAnalyzer`        | Flags unused `open` statements               |
| `UnusedDeclarationsAnalyzer` | Flags unused bindings                        |
| `SimplifyNameAnalyzer`       | Suggests simpler qualified names             |
| `ResolveNamespaces`          | Suggests adding `open` for unresolved names  |
| `EnableReferenceCodeLens`    | Shows reference counts as code lenses        |
| `KeywordsAutocomplete`       | Includes F# keywords in completions          |
| `UnionCaseStubGeneration`    | Generates match cases for discriminated unions |
| `RecordStubGeneration`       | Generates record field stubs                 |
| `InterfaceStubGeneration`    | Generates interface implementations          |

## Troubleshooting

1. **`Executable not found in $PATH`** — Ensure `fsautocomplete` is installed
   and in your PATH: `which fsautocomplete`
2. **Slow startup** — FSAC needs to start the .NET runtime, discover projects,
   and typecheck. The plugin allows up to 60 seconds. For very large solutions,
   ensure `dotnet build` succeeds first.
3. **No diagnostics appearing** — Check that your project builds successfully
   with `dotnet build`. FSAC relies on MSBuild project evaluation.
4. **Check plugin errors** — Use the `/plugin` errors tab in Claude Code for
   detailed error information.

## Acknowledgments

This plugin was created with the help of [Claude Code](https://claude.com/claude-code).

## License

MIT

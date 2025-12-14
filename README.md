# tree-sitter-ghactions

Github Actions expressions grammar for [tree-sitter](https://github.com/tree-sitter/tree-sitter)

## Features

* Parses Github Action's expressions: `${{ ... }}`
* Plays well with `bash` injections in YAML documents
* Passes parsing tests from [actionlint](https://github.com/rhysd/actionlint)

## Neovim Installation (for use in your editor)

1. Install [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter/tree/main)

It is recommended to install at least `yaml`, `bash`, `json`, and `comment` parsers to support github actions files.

2. Configure autocmd for a custom parser:

```lua
-- custom parsers
vim.api.nvim_create_autocmd('User', {
  pattern = 'TSUpdate',
  callback = function()
    require('nvim-treesitter.parsers').ghactions = {
      install_info = {
        url = 'https://github.com/rmuir/tree-sitter-ghactions',
        queries = 'queries',
      },
    }
  end,
})
```

3. Configure yaml injection in `~/.config/nvim/queries/yaml/injections.scm`:

```tsq
; extends

; github actions
([
  (string_scalar)
  (block_scalar)
  (double_quote_scalar)
  (single_quote_scalar)
  (ERROR)
] @injection.content
  (#lua-match? @injection.content "[$]{{")
  (#set! injection.language "ghactions"))
```

4. Run `:TSUpdate` and `:TSInstall ghactions` from neovim.

NOTE: these instructions are based upon the `main` branch of `nvim-treesitter`.

## Bindings Installation (for development)

Bindings are published to `pypi`, `npm`, and `crates.io` as `tree-sitter-ghactions`.
Wasm and source code artifacts are published to [GitHub releases](https://github.com/rmuir/tree-sitter-ghactions/releases)

## Screenshot of highlights

![Syntax highlighting screenshot](https://github.com/user-attachments/assets/0c1f34bb-6f02-4175-9495-97e6fa51334a)

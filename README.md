# tree-sitter-actions

Github Actions expressions grammar for [tree-sitter](https://github.com/tree-sitter/tree-sitter)

## Neovim Installation (for use in your editor)

1. Install [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter/tree/main)

2. Configure autocmd for a custom parser:
   
```lua
-- custom parsers
vim.api.nvim_create_autocmd('User', {
  pattern = 'TSUpdate',
  callback = function()
    require('nvim-treesitter.parsers').actions = {
      install_info = {
        url = 'https://github.com/rmuir/tree-sitter-actions',
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
] @injection.content
  (#lua-match? @injection.content "[$]{{.*}}")
  (#set! injection.language "actions"))
```

4. Run `:TSUpdate` from neovim.

NOTE: these instructions are based upon the `main` branch of `nvim-treesitter`.

## Bindings Installation (for development)

Bindings are published to `pypi`, `npm`, and `crates.io` as `tree-sitter-actions`.
Wasm and source code artifacts are published to [GitHub releases](https://github.com/rmuir/tree-sitter-actions/releases)

## Screenshot of highlights

![Syntax highlighting screenshot](https://github.com/user-attachments/assets/8c04aa7b-b6df-497e-963d-58fe5e50d780)

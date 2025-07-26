[
  "${{"
  "}}"
] @keyword

[
  "&&"
  "||"
  "=="
  "!="
  "<"
  "<="
  ">"
  ">="
  "+"
  "-"
  "!"
] @operator

[
  "("
  ")"
  "["
  "]"
] @punctuation.bracket

[
  ","
  "."
] @punctuation.delimiter

"*" @punctuation.special

(number) @number

(identifier) @variable

; https://docs.github.com/en/actions/reference/workflows-and-actions/contexts
(dereference_expression
  object: (identifier) @module.builtin
  (#any-of? @module.builtin
    "github" "env" "vars" "job" "jobs" "steps" "runner" "secrets" "strategy" "matrix" "needs"
    "inputs"))

(dereference_expression
  property: (identifier) @property)

(function_call
  name: (identifier) @function.call)

; https://docs.github.com/en/actions/reference/workflows-and-actions/expressions#functions
(function_call
  name: (identifier) @function.builtin
  (#any-of? @function.builtin
    "contains" "startsWith" "endsWith" "format" "join" "toJSON" "fromJSON" "hashFiles" "success"
    "always" "cancelled" "failure"))

[
  (true)
  (false)
] @boolean

(null) @constant.builtin

(string) @string

(escape) @string.escape

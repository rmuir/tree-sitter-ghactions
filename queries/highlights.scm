; note: all highlights (except @string) are set to priority 101, for compatibility with bash injections in yaml
([
  "${{"
  "}}"
] @keyword
  (#set! priority 101))

([
  "&&"
  "||"
  "=="
  "!="
  "<"
  "<="
  ">"
  ">="
  "!"
] @operator
  (#set! priority 101))

([
  "("
  ")"
  "["
  "]"
] @punctuation.bracket
  (#set! priority 101))

([
  ","
  "."
] @punctuation.delimiter
  (#set! priority 101))

("*" @punctuation.special
  (#set! priority 101))

((number) @number
  (#set! priority 101))

((identifier) @variable
  (#set! priority 101))

; https://docs.github.com/en/actions/reference/workflows-and-actions/contexts
(dereference_expression
  object: (identifier) @module.builtin
  ; TODO: technically case-insensitive
  (#any-of? @module.builtin
    "github" "env" "vars" "job" "jobs" "steps" "runner" "secrets" "strategy" "matrix" "needs"
    "inputs")
  (#set! priority 101))

((dereference_expression
  property: (identifier) @property)
  (#set! priority 101))

((function_call
  name: (identifier) @function.call)
  (#set! priority 101))

; https://docs.github.com/en/actions/reference/workflows-and-actions/expressions#functions
((function_call
  name: (identifier) @function.builtin
  ; TODO: technically case-insensitive
  (#any-of? @function.builtin
    "contains" "startsWith" "endsWith" "format" "join" "toJSON" "toJson" "fromJSON" "fromJson"
    "hashFiles" "success" "always" "cancelled" "failure"))
  (#set! priority 101))

([
  (true)
  (false)
] @boolean
  (#set! priority 101))

((null) @constant.builtin
  (#set! priority 101))

(string) @string

((escape) @string.escape
  (#set! priority 101))

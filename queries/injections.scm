; string constant arg to fromJSON()
(function_call
  name: (identifier) @_name
  arguments: (argument_list
    .
    (string
      .
      (string_fragment) @injection.content .) .)
  (#any-of? @_name "fromJSON" "fromJson")
  (#set! injection.language "json"))

; string constant first arg to format()
(function_call
  name: (identifier) @_name
  arguments: (argument_list
    .
    (string
      .
      (string_fragment) @injection.content .))
  (#eq? @_name "format")
  (#set! injection.language "nim_format_string"))

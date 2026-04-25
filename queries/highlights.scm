; Types

(type_identifier) @type
(predefined_type) @type.builtin

((identifier) @type
 (#match? @type "^[A-Z]"))

(type_arguments
  "<" @punctuation.bracket
  ">" @punctuation.bracket)

; Variables

(required_parameter (identifier) @variable.parameter)
(optional_parameter (identifier) @variable.parameter)

; Keywords

[ "abstract"
  "struct"
  "declare"
  "enum"
  "export"
  "implements"
  "interface"
  "keyof"
  "namespace"
  "private"
  "protected"
  "public"
  "type"
  "readonly"
  "override"
  "satisfies"
  "lazy"
] @keyword

(struct_declaration
  name: (type_identifier) @type)

(annotation_declaration
  name: (type_identifier) @type)

(decorator
  "@" @attribute)

(arkui_component_expression
  function: (identifier) @constructor)

(leading_dot_expression
  "." @punctuation.delimiter)

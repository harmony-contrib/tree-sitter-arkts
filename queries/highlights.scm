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

; An attribute chained onto a component that carries a children block hangs
; off the component node directly instead of a member_expression, so it needs
; this rule to match `Text('x').fontSize(16)` and `Column() {}.padding(4)`
; the same way.
(arkui_component_expression
  property: (property_identifier) @function.method)

(leading_dot_expression
  "." @punctuation.delimiter)

const JavaScript = require('tree-sitter-javascript/grammar');

module.exports = grammar(JavaScript, {
  name: 'arkts',

  externals: ($, previous) => previous.concat([
    $._function_signature_automatic_semicolon,
    $.__error_recovery,
  ]),

  supertypes: ($, previous) => previous.concat([
    $.type,
    $.primary_type,
  ]),

  precedences: ($, previous) => previous.concat([
    [
      'call',
      'instantiation',
      'unary',
      'binary',
      $.await_expression,
      $.arrow_function,
    ],
    [
      'extends',
      'instantiation',
    ],
    [
      $.intersection_type,
      $.union_type,
      $.conditional_type,
      $.function_type,
      'binary',
      $.type_predicate,
      $.readonly_type,
    ],
    [$.mapped_type_clause, $.primary_expression],
    [$.accessibility_modifier, $.primary_expression],
    ['unary_void', $.expression],
    [$.extends_clause, $.primary_expression],
    ['unary', 'assign'],
    ['declaration', $.expression],
    [$.predefined_type, $.unary_expression],
    [$.type, $.flow_maybe_type],
    [$.tuple_type, $.array_type, $.pattern, $.type],
    [$.readonly_type, $.pattern],
    [$.readonly_type, $.primary_expression],
    [$.type_query, $.subscript_expression, $.expression],
    [$.type_query, $._type_query_subscript_expression],
    [$.nested_type_identifier, $.generic_type, $.primary_type, $.lookup_type, $.index_type_query, $.type],
    [$.as_expression, $.satisfies_expression, $.primary_type],
    [$._type_query_member_expression, $.member_expression],
    [$.member_expression, $._type_query_member_expression_in_type_annotation],
    [$._type_query_member_expression, $.primary_expression],
    [$._type_query_subscript_expression, $.subscript_expression],
    [$._type_query_subscript_expression, $.primary_expression],
    [$._type_query_call_expression, $.primary_expression],
    [$._type_query_instantiation_expression, $.primary_expression],
    [$.type_query, $.primary_expression],
    [$.override_modifier, $.primary_expression],
    [$.decorator_call_expression, $.decorator],
    [$.literal_type, $.pattern],
    [$.predefined_type, $.pattern],
    [$.call_expression, $._type_query_call_expression],
    [$.call_expression, $._type_query_call_expression_in_type_annotation],
    [$.new_expression, $.primary_expression],
    [$.meta_property, $.primary_expression],
    [$.construct_signature, $._property_name],
  ]),

  conflicts: ($, previous) => previous.concat([
    [$.call_expression, $.instantiation_expression, $.binary_expression],
    [$.call_expression, $.instantiation_expression, $.binary_expression, $.unary_expression],
    [$.call_expression, $.instantiation_expression, $.binary_expression, $.update_expression],
    [$.call_expression, $.instantiation_expression, $.binary_expression, $.await_expression],

    // This appears to be necessary to parse a parenthesized class expression
    [$.class],

    [$.nested_identifier, $.nested_type_identifier, $.primary_expression],
    [$.nested_identifier, $.nested_type_identifier],

    [$._call_signature, $.function_type],
    [$._call_signature, $.constructor_type],

    [$.primary_expression, $._parameter_name],
    [$.primary_expression, $._parameter_name, $.primary_type],
    [$.primary_expression, $.literal_type],
    [$.primary_expression, $.literal_type, $.rest_pattern],
    [$.primary_expression, $.predefined_type, $.rest_pattern],
    [$.primary_expression, $.primary_type],
    [$.primary_expression, $.generic_type],
    [$.primary_expression, $.predefined_type],
    [$.primary_expression, $.pattern, $.primary_type],
    [$._parameter_name, $.primary_type],
    [$.pattern, $.primary_type],

    [$.optional_tuple_parameter, $.primary_type],
    [$.rest_pattern, $.primary_type, $.primary_expression],

    [$.object, $.object_type],
    [$.object, $.object_pattern, $.object_type],
    [$.object, $.object_pattern, $._property_name],
    [$.object_pattern, $.object_type],
    [$.object_pattern, $.object_type],

    [$.array, $.tuple_type],
    [$.array, $.array_pattern, $.tuple_type],
    [$.array_pattern, $.tuple_type],

    [$.template_literal_type, $.template_string],
    [$.primary_expression, $.internal_module],
    [$.subscript_expression, $._initializer],
    [$.arkui_component_expression, $.call_expression],
    [$.primary_expression, $.arkui_component_expression],
    [$.primary_expression, $.leading_dot_expression],
    [$.leading_dot_expression, $.member_expression],
    [$.export_statement, $.object],
    [$.export_statement, $.declaration],
    [$.primary_expression, $._property_name, $.arkui_component_expression],
    [$.primary_expression, $.arkui_component_expression, $.generic_type],
    [$.decorator, $.decorator_member_expression],
    [$.export_statement],
    [$.struct_declaration],
    [$.object, $._arkui_statement_block],
    [$.statement_block, $._arkui_statement_block],
    [$.statement_block, $.object, $._arkui_statement_block],
    [$.statement, $._arkui_statement],
    [$.declaration, $._arkui_non_arrow_expression],
    [$.declaration, $.expression, $._arkui_non_arrow_expression],
    [$.object, $.object_pattern, $._arkui_primary_expression],
    [$.primary_expression, $._arkui_primary_expression],
    [$.primary_expression, $._property_name, $._arkui_primary_expression],
    [$.export_statement, $._arkui_primary_expression],
    [$.primary_expression, $._arkui_primary_expression, $.arkui_component_expression],
    [$.primary_expression, $._property_name, $._arkui_primary_expression, $.arkui_component_expression],
    [$.primary_expression, $.function_expression, $.generator_function],
    [$.arkui_component_expression],
    [$.call_expression, $._arkui_non_arrow_expression],
    [$.expression, $._arkui_non_arrow_expression],
    [$.return_statement, $._arkui_return_statement],
    [$.throw_statement, $._arkui_throw_statement],
    [$.switch_body, $._arkui_switch_body],
    [$.switch_case, $._arkui_switch_case],
    [$.switch_default, $._arkui_switch_default],
    [$.return_statement, $.sequence_expression, $._arkui_expression],
    [$.throw_statement, $.sequence_expression, $._arkui_expression],
    [$.sequence_expression, $._arkui_expression],
    [$.expression_statement, $.sequence_expression, $._arkui_expression],
    [$.primary_expression, $.arrow_function, $._arkui_arrow_function],
    [$.primary_expression, $.arrow_function, $._property_name, $._arkui_arrow_function],
    [$.arrow_function, $._arkui_expression],
    [$._property_name, $.public_field_definition],
    [$._property_name, $.annotation_property_definition],
    [$._property_name, $.accessibility_modifier],
    [$._property_name, $.override_modifier],
    [$._property_name, $.abstract_method_signature],
    [$.method_definition, $._property_name],
    [$.method_definition, $._property_name, $.public_field_definition],
    [$.method_definition, $._property_name, $.public_field_definition, $.method_signature],
    [$.method_definition, $._property_name, $.public_field_definition, $.method_signature, $.index_signature],
    [$.method_definition, $._property_name, $.public_field_definition, $.method_signature, $._arkui_struct_lifecycle_method_definition],
    [$.method_definition, $._property_name, $.public_field_definition, $._arkui_struct_lifecycle_method_definition],
    [$.method_definition, $._property_name, $.method_signature],
    [$.method_definition, $._property_name, $.method_signature, $._arkui_method_definition],
    [$.method_definition, $._property_name, $.method_signature, $._arkui_struct_lifecycle_method_definition],
    [$.method_definition, $._property_name, $._arkui_struct_lifecycle_method_definition],
    [$._property_name, $._arkui_struct_lifecycle_method_definition],
    [$._property_name, $._arkui_labeled_statement],
    [$.labeled_statement, $._property_name, $._arkui_labeled_statement],
    [$.primary_type, $.type_parameter],
  ]),

  inline: ($, previous) => previous
    .filter((rule) => ![
      '_formal_parameter',
      '_call_signature',
    ].includes(rule.name))
    .concat([
      $._type_identifier,
      $._jsx_start_opening_element,
    ]),

  rules: {
    public_field_definition: $ => seq(
      repeat(field('decorator', $.decorator)),
      optional(choice(
        seq('declare', optional($.accessibility_modifier)),
        seq($.accessibility_modifier, optional('declare')),
      )),
      choice(
        seq(optional('static'), optional($.override_modifier), optional('readonly')),
        seq(optional('abstract'), optional('readonly')),
        seq(optional('readonly'), optional('abstract')),
        optional('accessor'),
      ),
      field('name', $._property_name),
      optional(choice('?', '!')),
      field('type', optional($.type_annotation)),
      optional($._initializer),
    ),

    // override original catch_clause, add optional type annotation
    catch_clause: $ => seq(
      'catch',
      optional(
        seq(
          '(',
          field(
            'parameter',
            choice($.identifier, $._destructuring_pattern),
          ),
          optional(
            // only types that resolve to 'any' or 'unknown' are supported
            // by the language but it's simpler to accept any type here.
            field('type', $.type_annotation),
          ),
          ')',
        ),
      ),
      field('body', $.statement_block),
    ),

    call_expression: $ => choice(
      prec('call', seq(
        field('function', choice($.expression, $.import)),
        field('type_arguments', optional($.type_arguments)),
        field('arguments', $.arguments),
      )),
      prec('template_call', seq(
        field('function', choice($.primary_expression, $.new_expression)),
        field('arguments', $.template_string),
      )),
      prec('member', seq(
        field('function', $.primary_expression),
        '?.',
        field('type_arguments', optional($.type_arguments)),
        field('arguments', $.arguments),
      )),
    ),

    new_expression: $ => prec.right('new', seq(
      'new',
      field('constructor', $.primary_expression),
      field('type_arguments', optional($.type_arguments)),
      field('arguments', optional($.arguments)),
    )),

    assignment_expression: $ => prec.right('assign', seq(
      optional('using'),
      field('left', choice($.parenthesized_expression, $._lhs_expression)),
      '=',
      field('right', $.expression),
    )),

    _augmented_assignment_lhs: ($, previous) => choice(previous, $.non_null_expression),

    _lhs_expression: ($, previous) => choice(previous, $.non_null_expression),

    primary_expression: ($, previous) => choice(
      previous,
      $.non_null_expression,
    ),

    // ArkTS inherits from JavaScript and reuses the TypeScript expression
    // surface while excluding JSX-only forms. ArkUI component DSL expressions
    // are intentionally not part of the global expression surface; they are
    // only accepted inside ArkUI DSL statement blocks.
    expression: ($, previous) => {
      const choices = [
        $.as_expression,
        $.satisfies_expression,
        $.instantiation_expression,
        $.internal_module,
      ];

      choices.push($.type_assertion);
      choices.push(...previous.members.filter((member) =>
        member.name !== '_jsx_element',
      ));

      return choice(...choices);
    },

    _jsx_start_opening_element: $ => seq(
      '<',
      optional(
        seq(
          choice(
            field('name', choice(
              $._jsx_identifier,
              $.jsx_namespace_name,
            )),
            seq(
              field('name', choice(
                $.identifier,
                alias($.nested_identifier, $.member_expression),
              )),
              field('type_arguments', optional($.type_arguments)),
            ),
          ),
          repeat(field('attribute', $._jsx_attribute)),
        ),
      ),
    ),

    jsx_opening_element: $ => prec.dynamic(-1, seq(
      $._jsx_start_opening_element,
      '>',
    )),

    jsx_self_closing_element: $ => prec.dynamic(-1, seq(
      $._jsx_start_opening_element,
      '/>',
    )),

    export_specifier: (_, previous) => seq(
      optional(choice('type', 'typeof')),
      previous,
    ),

    _import_identifier: $ => choice($.identifier, alias('type', $.identifier)),

    import_specifier: $ => seq(
      optional(choice('type', 'typeof')),
      choice(
        field('name', $._import_identifier),
        seq(
          field('name', choice($._module_export_name, alias('type', $.identifier))),
          'as',
          field('alias', $._import_identifier),
        ),
      ),
    ),

    import_attribute: $ => seq(choice('with', 'assert'), $.object),

    import_clause: $ => choice(
      $.namespace_import,
      $.named_imports,
      seq(
        $._import_identifier,
        optional(seq(
          ',',
          choice(
            $.namespace_import,
            $.named_imports,
          ),
        )),
      ),
    ),

    import_statement: $ => {
      const standardImport = seq(
        'import',
        optional(choice('type', 'typeof')),
        choice(
          seq($.import_clause, $._from_clause),
          $.import_require_clause,
          field('source', $.string),
        ),
        optional($.import_attribute),
        $._semicolon,
      );

      return choice($.lazy_import_statement, standardImport);
    },

    export_statement: ($, previous) => choice(
      prec.right('declaration', seq(
        repeat(field('decorator', $.decorator)),
        field('decorator', alias($.arkui_dsl_decorator, $.decorator)),
        repeat(field('decorator', $.decorator)),
        'export',
        optional('default'),
        field('declaration', alias($._arkui_export_function_declaration, $.function_declaration)),
      )),
      prec.right(seq(
        repeat1(field('decorator', $.decorator)),
        previous,
      )),
      seq(
        'export',
        'default',
        field('declaration', $.struct_declaration),
        optional($._automatic_semicolon),
      ),
      previous,
      seq(
        'export',
        'type',
        $.export_clause,
        optional($._from_clause),
        $._semicolon,
      ),
      seq('export', '=', $.expression, $._semicolon),
      seq('export', 'as', 'namespace', $.identifier, $._semicolon),
    ),

    non_null_expression: $ => prec.left('unary', seq(
      $.expression, '!',
    )),

    variable_declarator: $ => choice(
      seq(
        field('name', choice($.identifier, $._destructuring_pattern)),
        field('type', optional($.type_annotation)),
        optional($._initializer),
      ),
      prec('declaration', seq(
        field('name', $.identifier),
        '!',
        field('type', $.type_annotation),
      )),
    ),

    method_signature: $ => seq(
      optional($.accessibility_modifier),
      optional('static'),
      optional($.override_modifier),
      optional('readonly'),
      optional('async'),
      optional(choice('get', 'set', '*')),
      field('name', $._property_name),
      optional('?'),
      $._call_signature,
    ),

    abstract_method_signature: $ => seq(
      optional($.accessibility_modifier),
      'abstract',
      optional($.override_modifier),
      optional(choice('get', 'set', '*')),
      field('name', $._property_name),
      optional('?'),
      $._call_signature,
    ),

    parenthesized_expression: $ => seq(
      '(',
      choice(
        seq($.expression, field('type', optional($.type_annotation))),
        $.sequence_expression,
      ),
      ')',
    ),

    _arkui_statement_block: $ => prec.right(seq(
      '{',
      repeat($._arkui_statement),
      '}',
      optional($._automatic_semicolon),
    )),

    _arkui_statement: $ => choice(
      $.export_statement,
      $.import_statement,
      $.debugger_statement,
      alias($.arkui_expression_statement, $.expression_statement),
      $.declaration,
      alias($._arkui_statement_block, $.statement_block),
      alias($._arkui_if_statement, $.if_statement),
      alias($._arkui_switch_statement, $.switch_statement),
      alias($._arkui_for_statement, $.for_statement),
      alias($._arkui_for_in_statement, $.for_in_statement),
      alias($._arkui_while_statement, $.while_statement),
      alias($._arkui_do_statement, $.do_statement),
      alias($._arkui_try_statement, $.try_statement),
      alias($._arkui_with_statement, $.with_statement),
      $.break_statement,
      $.continue_statement,
      alias($._arkui_return_statement, $.return_statement),
      alias($._arkui_throw_statement, $.throw_statement),
      $.empty_statement,
      alias($._arkui_labeled_statement, $.labeled_statement),
    ),

    arkui_expression_statement: $ => prec.right(seq(
      $._arkui_expressions,
      optional(';'),
    )),

    _arkui_expressions: $ => choice(
      $._arkui_expression,
      alias($._arkui_sequence_expression, $.sequence_expression),
    ),

    _arkui_sequence_expression: $ => prec.right(seq(
      $._arkui_expression,
      repeat1(seq(',', $._arkui_expression)),
    )),

    _arkui_expression: $ => choice(
      $.arkui_component_expression,
      $.leading_dot_expression,
      alias($._arkui_arrow_function, $.arrow_function),
      $._arkui_non_arrow_expression,
    ),

    _arkui_argument_expression: $ => choice(
      alias($._arkui_arrow_function, $.arrow_function),
      $._arkui_non_arrow_expression,
    ),

    _arkui_non_arrow_expression: $ => choice(
      $._arkui_primary_expression,
      $.assignment_expression,
      $.augmented_assignment_expression,
      $.await_expression,
      $.unary_expression,
      $.binary_expression,
      $.ternary_expression,
      $.update_expression,
      $.new_expression,
      $.yield_expression,
      $.as_expression,
      $.satisfies_expression,
      $.instantiation_expression,
      $.internal_module,
      $.type_assertion,
    ),

    _arkui_primary_expression: $ => choice(
      $.subscript_expression,
      $.member_expression,
      $.parenthesized_expression,
      $._identifier,
      $.this,
      $.super,
      $.number,
      $.string,
      $.template_string,
      $.regex,
      $.true,
      $.false,
      $.null,
      $.object,
      $.array,
      $.function_expression,
      $.generator_function,
      $.class,
      $.meta_property,
      $.call_expression,
      $.non_null_expression,
    ),

    _arkui_arrow_function: $ => seq(
      optional('async'),
      choice(
        field('parameter', choice(
          alias($._reserved_identifier, $.identifier),
          $.identifier,
        )),
        $._call_signature,
      ),
      '=>',
      field('body', choice(
        $._arkui_expression,
        alias($._arkui_statement_block, $.statement_block),
      )),
    ),

    _arkui_if_statement: $ => prec.right(seq(
      'if',
      field('condition', $.parenthesized_expression),
      field('consequence', $._arkui_statement),
      optional(field('alternative', alias($._arkui_else_clause, $.else_clause))),
    )),

    _arkui_else_clause: $ => seq('else', $._arkui_statement),

    _arkui_switch_statement: $ => seq(
      'switch',
      field('value', $.parenthesized_expression),
      field('body', alias($._arkui_switch_body, $.switch_body)),
    ),

    _arkui_switch_body: $ => seq(
      '{',
      repeat(choice(
        alias($._arkui_switch_case, $.switch_case),
        alias($._arkui_switch_default, $.switch_default),
      )),
      '}',
    ),

    _arkui_switch_case: $ => seq(
      'case',
      field('value', $._arkui_expressions),
      ':',
      field('body', repeat($._arkui_statement)),
    ),

    _arkui_switch_default: $ => seq(
      'default',
      ':',
      field('body', repeat($._arkui_statement)),
    ),

    _arkui_for_statement: $ => seq(
      'for',
      '(',
      choice(
        field('initializer', choice($.lexical_declaration, $.variable_declaration)),
        seq(field('initializer', $._arkui_expressions), ';'),
        field('initializer', $.empty_statement),
      ),
      field('condition', choice(
        seq($._arkui_expressions, ';'),
        $.empty_statement,
      )),
      field('increment', optional($._arkui_expressions)),
      ')',
      field('body', $._arkui_statement),
    ),

    _arkui_for_in_statement: $ => seq(
      'for',
      optional('await'),
      $._for_header,
      field('body', $._arkui_statement),
    ),

    _arkui_while_statement: $ => seq(
      'while',
      field('condition', $.parenthesized_expression),
      field('body', $._arkui_statement),
    ),

    _arkui_do_statement: $ => prec.right(seq(
      'do',
      field('body', $._arkui_statement),
      'while',
      field('condition', $.parenthesized_expression),
      optional($._semicolon),
    )),

    _arkui_try_statement: $ => seq(
      'try',
      field('body', alias($._arkui_statement_block, $.statement_block)),
      optional(field('handler', alias($._arkui_catch_clause, $.catch_clause))),
      optional(field('finalizer', alias($._arkui_finally_clause, $.finally_clause))),
    ),

    _arkui_catch_clause: $ => seq(
      'catch',
      optional(seq(
        '(',
        field('parameter', choice($.identifier, $._destructuring_pattern)),
        optional(field('type', $.type_annotation)),
        ')',
      )),
      field('body', alias($._arkui_statement_block, $.statement_block)),
    ),

    _arkui_finally_clause: $ => seq(
      'finally',
      field('body', alias($._arkui_statement_block, $.statement_block)),
    ),

    _arkui_with_statement: $ => seq(
      'with',
      field('object', $.parenthesized_expression),
      field('body', $._arkui_statement),
    ),

    _arkui_return_statement: $ => seq(
      'return',
      optional($._arkui_expressions),
      $._semicolon,
    ),

    _arkui_throw_statement: $ => seq(
      'throw',
      $._arkui_expressions,
      $._semicolon,
    ),

    _arkui_labeled_statement: $ => prec.dynamic(-1, seq(
      field('label', alias(choice($.identifier, $._reserved_identifier), $.statement_identifier)),
      ':',
      field('body', $._arkui_statement),
    )),

    _formal_parameter: $ => choice(
      $.required_parameter,
      $.optional_parameter,
    ),

    function_signature: $ => seq(
      optional('async'),
      'function',
      field('name', $.identifier),
      $._call_signature,
      choice($._semicolon, $._function_signature_automatic_semicolon),
    ),

    function_declaration: ($, previous) => choice(
      $._arkui_function_declaration,
      previous,
      prec.right('declaration', seq(
        repeat1(field('decorator', $.decorator)),
        previous,
      )),
    ),

    _arkui_function_declaration: $ => prec.right('declaration', seq(
      repeat(field('decorator', $.decorator)),
      field('decorator', alias($.arkui_dsl_decorator, $.decorator)),
      repeat(field('decorator', $.decorator)),
      optional('async'),
      'function',
      field('name', $.identifier),
      $._call_signature,
      field('body', alias($._arkui_statement_block, $.statement_block)),
      optional($._automatic_semicolon),
    )),

    _arkui_export_function_declaration: $ => prec.right('declaration', seq(
      optional('async'),
      'function',
      field('name', $.identifier),
      $._call_signature,
      field('body', alias($._arkui_statement_block, $.statement_block)),
      optional($._automatic_semicolon),
    )),

    decorator: $ => seq(
      '@',
      choice(
        $.identifier,
        alias($.decorator_member_expression, $.member_expression),
        alias($.decorator_call_expression, $.call_expression),
        alias($.decorator_parenthesized_expression, $.parenthesized_expression),
      ),
    ),

    arkui_dsl_decorator: $ => seq(
      '@',
      choice(
        alias(choice(
          'Builder',
          'LocalBuilder',
          'Styles',
        ), $.identifier),
        alias($.arkui_dsl_decorator_call_expression, $.call_expression),
        alias($.arkui_dsl_decorator_member_expression, $.member_expression),
      ),
    ),

    arkui_dsl_decorator_call_expression: $ => prec('call', seq(
      field('function', choice(
        alias(choice(
          'Builder',
          'LocalBuilder',
          'Extend',
          'AnimatableExtend',
          'Styles',
        ), $.identifier),
        $.arkui_dsl_decorator_member_expression,
      )),
      optional(field('type_arguments', $.type_arguments)),
      field('arguments', $.arguments),
    )),

    arkui_dsl_decorator_member_expression: $ => prec('member', seq(
      field('object', choice(
        $.identifier,
        alias($.arkui_dsl_decorator_member_expression, $.member_expression),
      )),
      '.',
      field('property', alias(choice(
        'Builder',
        'LocalBuilder',
        'Extend',
        'AnimatableExtend',
        'Styles',
      ), $.property_identifier)),
    )),

    decorator_call_expression: $ => prec('call', seq(
      field('function', choice(
        $.identifier,
        alias($.decorator_member_expression, $.member_expression),
      )),
      optional(field('type_arguments', $.type_arguments)),
      field('arguments', $.arguments),
    )),

    decorator_parenthesized_expression: $ => seq(
      '(',
      choice(
        $.identifier,
        alias($.decorator_member_expression, $.member_expression),
        alias($.decorator_call_expression, $.call_expression),
      ),
      ')',
    ),

    lazy_import_statement: $ => seq(
      'import',
      'lazy',
      choice(
        seq($.import_clause, $._from_clause),
        field('source', $.string),
      ),
      optional($.import_attribute),
      $._semicolon,
    ),

    leading_dot_expression: $ => prec.left('member', seq(
      '.',
      field('expression', choice(
        $.identifier,
        $.call_expression,
        $.member_expression,
        $.subscript_expression,
        $.parenthesized_expression,
      )),
    )),

    arkui_arguments: $ => seq(
      '(',
      commaSep(choice(
        $.spread_element,
        $._arkui_argument_expression,
      )),
      ')',
    ),

    arkui_children: $ => seq(
      '{',
      repeat($._arkui_statement),
      '}',
    ),

    arkui_component_expression: $ => choice(
      prec.dynamic(1, prec('call', seq(
        field('function', $.identifier),
        field('type_arguments', optional($.type_arguments)),
        field('arguments', alias($.arkui_arguments, $.arguments)),
        field('children', $.arkui_children),
        repeat($._arkui_component_chain),
      ))),
      prec('call', seq(
        field('function', $.identifier),
        field('type_arguments', optional($.type_arguments)),
        field('arguments', alias($.arkui_arguments, $.arguments)),
        repeat($._arkui_component_chain),
      )),
      prec.dynamic(1, prec('call', seq(
        field('function', choice(
          $.this,
          $.super,
          $.member_expression,
          $.subscript_expression,
          $.call_expression,
          $.new_expression,
          $.parenthesized_expression,
          $.non_null_expression,
          $.meta_property,
        )),
        field('type_arguments', optional($.type_arguments)),
        field('arguments', alias($.arkui_arguments, $.arguments)),
        field('children', $.arkui_children),
        repeat($._arkui_component_chain),
      ))),
    ),

    _arkui_component_chain: $ => seq(
      '.',
      field('property', alias($.identifier, $.property_identifier)),
      field('arguments', alias($.arkui_arguments, $.arguments)),
    ),

    annotation_property_definition: $ => seq(
      repeat(field('decorator', $.decorator)),
      optional($.accessibility_modifier),
      optional('static'),
      optional($.override_modifier),
      optional('readonly'),
      field('name', $._property_name),
      field('type', optional($.type_annotation)),
      optional($._initializer),
    ),

    annotation_body: $ => seq(
      '{',
      repeat(choice(
        seq($.annotation_property_definition, optional(choice($._semicolon, ','))),
        ';',
      )),
      '}',
    ),

    annotation_declaration: $ => prec.left('declaration', seq(
      '@',
      'interface',
      field('name', $._type_identifier),
      field('body', $.annotation_body),
      optional($._automatic_semicolon),
    )),

    class_body: $ => seq(
      '{',
      repeat(choice(
        seq(
          repeat(field('decorator', $.decorator)),
          field('decorator', alias($.arkui_dsl_decorator, $.decorator)),
          repeat(field('decorator', $.decorator)),
          alias($._arkui_method_definition, $.method_definition),
          optional($._semicolon),
        ),
        seq(
          repeat(field('decorator', $.decorator)),
          $.method_definition,
          optional($._semicolon),
        ),
        // As it happens for functions, the semicolon insertion should not
        // happen if a block follows the closing paren, because then it's a
        // *definition*, not a declaration. Example:
        //     public foo()
        //     { <--- this brace made the method signature become a definition
        //     }
        // The same rule applies for functions and that's why we use
        // "_function_signature_automatic_semicolon".
        seq($.method_signature, choice($._function_signature_automatic_semicolon, ',')),
        $.class_static_block,
        seq(
          choice(
            $.abstract_method_signature,
            $.index_signature,
            $.method_signature,
            $.public_field_definition,
          ),
          choice($._semicolon, ','),
        ),
        ';',
      )),
      '}',
    ),

    struct_body: $ => seq(
      '{',
      repeat(choice(
        seq(
          repeat(field('decorator', $.decorator)),
          field('decorator', alias($.arkui_dsl_decorator, $.decorator)),
          repeat(field('decorator', $.decorator)),
          alias($._arkui_method_definition, $.method_definition),
          optional($._semicolon),
        ),
        seq(
          repeat(field('decorator', $.decorator)),
          alias($._arkui_struct_lifecycle_method_definition, $.method_definition),
          optional($._semicolon),
        ),
        seq(
          repeat(field('decorator', $.decorator)),
          $.method_definition,
          optional($._semicolon),
        ),
        seq(
          choice(
            $.abstract_method_signature,
            $.index_signature,
            $.method_signature,
            $.public_field_definition,
          ),
          optional(choice($._semicolon, ',')),
        ),
        ';',
      )),
      '}',
    ),

    struct_declaration: $ => prec.left('declaration', seq(
      repeat(field('decorator', $.decorator)),
      optional('declare'),
      optional('abstract'),
      'struct',
      field('name', $._type_identifier),
      field('type_parameters', optional($.type_parameters)),
      field('body', $.struct_body),
      optional($._automatic_semicolon),
    )),

    method_definition: $ => prec.left(seq(
      optional($.accessibility_modifier),
      optional('static'),
      optional($.override_modifier),
      optional('readonly'),
      optional('async'),
      optional(choice('get', 'set', '*')),
      field('name', $._property_name),
      optional('?'),
      $._call_signature,
      field('body', $.statement_block),
    )),

    _arkui_method_definition: $ => prec.left(seq(
      optional($.accessibility_modifier),
      optional('static'),
      optional($.override_modifier),
      optional('readonly'),
      optional('async'),
      optional(choice('get', 'set', '*')),
      field('name', $._property_name),
      optional('?'),
      $._call_signature,
      field('body', alias($._arkui_statement_block, $.statement_block)),
    )),

    _arkui_struct_lifecycle_method_definition: $ => prec.left(seq(
      optional($.accessibility_modifier),
      optional('static'),
      optional($.override_modifier),
      optional('readonly'),
      optional('async'),
      optional(choice('get', 'set', '*')),
      field('name', alias(choice('build', 'pageTransition'), $.property_identifier)),
      optional('?'),
      $._call_signature,
      field('body', alias($._arkui_statement_block, $.statement_block)),
    )),

    _property_name: ($, previous) => choice(
      previous,
      alias(choice('build', 'pageTransition'), $.property_identifier),
    ),

    declaration: ($, previous) => choice(
      previous,
      $.struct_declaration,
      $.annotation_declaration,
      $.function_signature,
      $.abstract_class_declaration,
      $.module,
      prec('declaration', $.internal_module),
      $.type_alias_declaration,
      $.enum_declaration,
      $.interface_declaration,
      $.import_alias,
      $.ambient_declaration,
    ),

    type_assertion: $ => prec.left('unary', seq(
      $.type_arguments,
      $.expression,
    )),

    as_expression: $ => prec.left('binary', seq(
      $.expression,
      'as',
      choice('const', $.type),
    )),

    satisfies_expression: $ => prec.left('binary', seq(
      $.expression,
      'satisfies',
      $.type,
    )),

    instantiation_expression: $ => prec('instantiation', seq(
      $.expression,
      field('type_arguments', $.type_arguments),
    )),

    class_heritage: $ => choice(
      seq($.extends_clause, optional($.implements_clause)),
      $.implements_clause,
    ),

    import_require_clause: $ => seq(
      $.identifier,
      '=',
      'require',
      '(',
      field('source', $.string),
      ')',
    ),

    extends_clause: $ => seq(
      'extends',
      commaSep1($._extends_clause_single),
    ),

    _extends_clause_single: $ => prec('extends', seq(
      field('value', $.expression),
      field('type_arguments', optional($.type_arguments)),
    )),

    implements_clause: $ => seq(
      'implements',
      commaSep1($.type),
    ),

    object: (_, previous) => previous,

    ambient_declaration: $ => seq(
      'declare',
      choice(
        $.declaration,
        seq('global', $.statement_block),
        seq('module', '.', alias($.identifier, $.property_identifier), ':', $.type, $._semicolon),
      ),
    ),

    class: $ => prec('literal', seq(
      repeat(field('decorator', $.decorator)),
      'class',
      field('name', optional($._type_identifier)),
      field('type_parameters', optional($.type_parameters)),
      optional($.class_heritage),
      field('body', $.class_body),
    )),

    abstract_class_declaration: $ => prec('declaration', seq(
      repeat(field('decorator', $.decorator)),
      'abstract',
      'class',
      field('name', $._type_identifier),
      field('type_parameters', optional($.type_parameters)),
      optional($.class_heritage),
      field('body', $.class_body),
    )),

    class_declaration: $ => prec.left('declaration', seq(
      repeat(field('decorator', $.decorator)),
      'class',
      field('name', $._type_identifier),
      field('type_parameters', optional($.type_parameters)),
      optional($.class_heritage),
      field('body', $.class_body),
      optional($._automatic_semicolon),
    )),

    module: $ => seq(
      'module',
      $._module,
    ),

    internal_module: $ => seq(
      'namespace',
      $._module,
    ),

    _module: $ => prec.right(seq(
      field('name', choice($.string, $.identifier, $.nested_identifier)),
      // On .d.ts files "declare module foo" desugars to "declare module foo {}",
      // hence why it is optional here
      field('body', optional($.statement_block)),
    )),

    import_alias: $ => seq(
      'import',
      $.identifier,
      '=',
      choice($.identifier, $.nested_identifier),
      $._semicolon,
    ),

    nested_type_identifier: $ => prec('member', seq(
      field('module', choice($.identifier, $.nested_identifier)),
      '.',
      field('name', $._type_identifier),
    )),

    interface_declaration: $ => seq(
      'interface',
      field('name', $._type_identifier),
      field('type_parameters', optional($.type_parameters)),
      optional($.extends_type_clause),
      field('body', alias($.object_type, $.interface_body)),
    ),

    extends_type_clause: $ => seq(
      'extends',
      commaSep1(field('type', choice(
        $._type_identifier,
        $.nested_type_identifier,
        $.generic_type,
      ))),
    ),

    enum_declaration: $ => seq(
      optional('const'),
      'enum',
      field('name', $.identifier),
      field('body', $.enum_body),
    ),

    enum_body: $ => seq(
      '{',
      optional(seq(
        sepBy1(',', choice(
          field('name', $._property_name),
          $.enum_assignment,
        )),
        optional(','),
      )),
      '}',
    ),

    enum_assignment: $ => seq(
      field('name', $._property_name),
      $._initializer,
    ),

    type_alias_declaration: $ => seq(
      'type',
      field('name', $._type_identifier),
      field('type_parameters', optional($.type_parameters)),
      '=',
      field('value', $.type),
      $._semicolon,
    ),

    accessibility_modifier: _ => choice(
      'public',
      'private',
      'protected',
    ),

    override_modifier: _ => 'override',

    required_parameter: $ => seq(
      $._parameter_name,
      field('type', optional($.type_annotation)),
      optional($._initializer),
    ),

    optional_parameter: $ => seq(
      $._parameter_name,
      '?',
      field('type', optional($.type_annotation)),
      optional($._initializer),
    ),

    _parameter_name: $ => seq(
      repeat(field('decorator', $.decorator)),
      optional($.accessibility_modifier),
      optional($.override_modifier),
      optional('readonly'),
      field('pattern', choice($.pattern, $.this)),
    ),

    omitting_type_annotation: $ => seq('-?:', $.type),
    adding_type_annotation: $ => seq('+?:', $.type),
    opting_type_annotation: $ => seq('?:', $.type),
    type_annotation: $ => seq(
      ':',
      $.type,
    ),

    // Oh boy
    // The issue is these special type queries need a lower relative precedence than the normal ones,
    // since these are used in type annotations whereas the other ones are used where `typeof` is
    // required beforehand. This allows for parsing of annotations such as
    // foo: import('x').y.z;
    // but was a nightmare to get working.
    _type_query_member_expression_in_type_annotation: $ => seq(
      field('object', choice(
        $.import,
        alias($._type_query_member_expression_in_type_annotation, $.member_expression),
        alias($._type_query_call_expression_in_type_annotation, $.call_expression),
      )),
      '.',
      field('property', choice(
        $.private_property_identifier,
        alias($.identifier, $.property_identifier),
      )),
    ),
    _type_query_call_expression_in_type_annotation: $ => seq(
      field('function', choice(
        $.import,
        alias($._type_query_member_expression_in_type_annotation, $.member_expression),
      )),
      field('arguments', $.arguments),
    ),

    asserts: $ => seq(
      'asserts',
      choice($.type_predicate, $.identifier, $.this),
    ),

    asserts_annotation: $ => seq(
      seq(':', $.asserts),
    ),

    type: $ => choice(
      $.primary_type,
      $.function_type,
      $.readonly_type,
      $.constructor_type,
      $.infer_type,
      prec(-1, alias($._type_query_member_expression_in_type_annotation, $.member_expression)),
      prec(-1, alias($._type_query_call_expression_in_type_annotation, $.call_expression)),
    ),

    tuple_parameter: $ => seq(
      field('name', choice($.identifier, $.rest_pattern)),
      field('type', $.type_annotation),
    ),

    optional_tuple_parameter: $ => seq(
      field('name', $.identifier),
      '?',
      field('type', $.type_annotation),
    ),

    optional_type: $ => seq($.type, '?'),
    rest_type: $ => seq('...', $.type),

    _tuple_type_member: $ => choice(
      alias($.tuple_parameter, $.required_parameter),
      alias($.optional_tuple_parameter, $.optional_parameter),
      $.optional_type,
      $.rest_type,
      $.type,
    ),

    constructor_type: $ => prec.left(seq(
      optional('abstract'),
      'new',
      field('type_parameters', optional($.type_parameters)),
      field('parameters', $.formal_parameters),
      '=>',
      field('type', $.type),
    )),

    primary_type: $ => choice(
      $.parenthesized_type,
      $.predefined_type,
      $._type_identifier,
      $.nested_type_identifier,
      $.generic_type,
      $.object_type,
      $.array_type,
      $.tuple_type,
      $.flow_maybe_type,
      $.type_query,
      $.index_type_query,
      alias($.this, $.this_type),
      $.existential_type,
      $.literal_type,
      $.lookup_type,
      $.conditional_type,
      $.template_literal_type,
      $.intersection_type,
      $.union_type,
      'const',
    ),

    template_type: $ => seq('${', choice($.primary_type, $.infer_type), '}'),

    template_literal_type: $ => seq(
      '`',
      repeat(choice(
        alias($._template_chars, $.string_fragment),
        $.template_type,
      )),
      '`',
    ),

    infer_type: $ => prec.right(seq(
      'infer',
      $._type_identifier,
      optional(seq(
        'extends',
        $.type,
      )),
    )),

    conditional_type: $ => prec.right(seq(
      field('left', $.type),
      'extends',
      field('right', $.type),
      '?',
      field('consequence', $.type),
      ':',
      field('alternative', $.type),
    )),

    generic_type: $ => prec('call', seq(
      field('name', choice(
        $._type_identifier,
        $.nested_type_identifier,
      )),
      field('type_arguments', $.type_arguments),
    )),

    type_predicate: $ => seq(
      field('name', choice(
        $.identifier,
        $.this,
        // Sometimes tree-sitter contextual lexing is not good enough to know
        // that 'object' in ':object is foo' is really an identifier and not
        // a predefined_type, so we must explicitely list all possibilities.
        // TODO: should we use '_reserved_identifier'? Should all the element in
        // 'predefined_type' be added to '_reserved_identifier'?
        alias($.predefined_type, $.identifier),
      )),
      'is',
      field('type', $.type),
    ),

    type_predicate_annotation: $ => seq(
      seq(':', $.type_predicate),
    ),

    // Type query expressions are more restrictive than regular expressions
    _type_query_member_expression: $ => seq(
      field('object', choice(
        $.identifier,
        $.this,
        alias($._type_query_subscript_expression, $.subscript_expression),
        alias($._type_query_member_expression, $.member_expression),
        alias($._type_query_call_expression, $.call_expression),
      )),
      choice('.', '?.'),
      field('property', choice(
        $.private_property_identifier,
        alias($.identifier, $.property_identifier),
      )),
    ),
    _type_query_subscript_expression: $ => seq(
      field('object', choice(
        $.identifier,
        $.this,
        alias($._type_query_subscript_expression, $.subscript_expression),
        alias($._type_query_member_expression, $.member_expression),
        alias($._type_query_call_expression, $.call_expression),
      )),
      optional('?.'),
      '[', field('index', choice($.predefined_type, $.string, $.number)), ']',
    ),
    _type_query_call_expression: $ => seq(
      field('function', choice(
        $.import,
        $.identifier,
        alias($._type_query_member_expression, $.member_expression),
        alias($._type_query_subscript_expression, $.subscript_expression),
      )),
      field('arguments', $.arguments),
    ),
    _type_query_instantiation_expression: $ => seq(
      field('function', choice(
        $.import,
        $.identifier,
        alias($._type_query_member_expression, $.member_expression),
        alias($._type_query_subscript_expression, $.subscript_expression),
      )),
      field('type_arguments', $.type_arguments),
    ),
    type_query: $ => prec.right(seq(
      'typeof',
      choice(
        alias($._type_query_subscript_expression, $.subscript_expression),
        alias($._type_query_member_expression, $.member_expression),
        alias($._type_query_call_expression, $.call_expression),
        alias($._type_query_instantiation_expression, $.instantiation_expression),
        $.identifier,
        $.this,
      ),
    )),

    index_type_query: $ => seq(
      'keyof',
      $.primary_type,
    ),

    lookup_type: $ => seq(
      $.primary_type,
      '[',
      $.type,
      ']',
    ),

    mapped_type_clause: $ => seq(
      field('name', $._type_identifier),
      'in',
      field('type', $.type),
      optional(seq('as', field('alias', $.type))),
    ),

    literal_type: $ => choice(
      alias($._number, $.unary_expression),
      $.number,
      $.string,
      $.true,
      $.false,
      $.null,
      $.undefined,
    ),

    _number: $ => prec.left(1, seq(
      field('operator', choice('-', '+')),
      field('argument', $.number),
    )),

    existential_type: _ => '*',

    flow_maybe_type: $ => prec.right(seq('?', $.primary_type)),

    parenthesized_type: $ => seq('(', $.type, ')'),

    predefined_type: _ => choice(
      'any',
      'number',
      'boolean',
      'string',
      'symbol',
      alias(seq('unique', 'symbol'), 'unique symbol'),
      'void',
      'unknown',
      'string',
      'never',
      'object',
    ),

    type_arguments: $ => seq(
      '<',
      commaSep1($.type),
      optional(','),
      '>',
    ),

    object_type: $ => seq(
      choice('{', '{|'),
      optional(seq(
        optional(choice(',', ';')),
        sepBy1(
          choice(',', $._semicolon),
          choice(
            $.export_statement,
            $.property_signature,
            $.call_signature,
            $.construct_signature,
            $.index_signature,
            $.method_signature,
          ),
        ),
        optional(choice(',', $._semicolon)),
      )),
      choice('}', '|}'),
    ),

    call_signature: $ => $._call_signature,

    property_signature: $ => seq(
      optional($.accessibility_modifier),
      optional('static'),
      optional($.override_modifier),
      optional('readonly'),
      field('name', $._property_name),
      optional('?'),
      field('type', optional($.type_annotation)),
    ),

    _call_signature: $ => seq(
      field('type_parameters', optional($.type_parameters)),
      field('parameters', $.formal_parameters),
      field('return_type', optional(
        choice($.type_annotation, $.asserts_annotation, $.type_predicate_annotation),
      )),
    ),

    type_parameters: $ => seq(
      '<', commaSep1($.type_parameter), optional(','), '>',
    ),

    type_parameter: $ => seq(
      optional('const'),
      field('name', $._type_identifier),
      field('constraint', optional($.constraint)),
      field('value', optional($.default_type)),
    ),

    default_type: $ => seq(
      '=',
      $.type,
    ),

    constraint: $ => seq(
      choice('extends', ':'),
      $.type,
    ),

    construct_signature: $ => seq(
      optional('abstract'),
      'new',
      field('type_parameters', optional($.type_parameters)),
      field('parameters', $.formal_parameters),
      field('type', optional($.type_annotation)),
    ),

    index_signature: $ => seq(
      optional(
        seq(
          field('sign', optional(choice('-', '+'))),
          'readonly',
        ),
      ),
      '[',
      choice(
        seq(
          field('name', choice(
            $.identifier,
            alias($._reserved_identifier, $.identifier),
          )),
          ':',
          field('index_type', $.type),
        ),
        $.mapped_type_clause,
      ),
      ']',
      field('type', choice(
        $.type_annotation,
        $.omitting_type_annotation,
        $.adding_type_annotation,
        $.opting_type_annotation,
      )),
    ),

    array_type: $ => seq($.primary_type, '[', ']'),
    tuple_type: $ => seq(
      '[', commaSep($._tuple_type_member), optional(','), ']',
    ),
    readonly_type: $ => seq('readonly', $.type),

    union_type: $ => prec.left(seq(optional($.type), '|', $.type)),
    intersection_type: $ => prec.left(seq(optional($.type), '&', $.type)),

    function_type: $ => prec.left(seq(
      field('type_parameters', optional($.type_parameters)),
      field('parameters', $.formal_parameters),
      '=>',
      field('return_type', choice($.type, $.asserts, $.type_predicate)),
    )),

    _type_identifier: $ => alias($.identifier, $.type_identifier),

    _reserved_identifier: (_, previous) => choice(
      'declare',
      'namespace',
      'type',
      'lazy',
      'struct',
      'public',
      'private',
      'protected',
      'override',
      'readonly',
      'module',
      'any',
      'number',
      'boolean',
      'string',
      'symbol',
      'export',
      'object',
      'new',
      'readonly',
      previous,
    ),
  },
});

/**
 * Creates a rule to match one or more of the rules separated by a comma
 *
 * @param {RuleOrLiteral} rule
 *
 * @returns {SeqRule}
 */
function commaSep1(rule) {
  return sepBy1(',', rule);
}

/**
 * Creates a rule to optionally match one or more of the rules separated by a comma
 *
 * @param {RuleOrLiteral} rule
 *
 * @returns {SeqRule}
 */
function commaSep(rule) {
  return sepBy(',', rule);
}

/**
 * Creates a rule to optionally match one or more of the rules separated by a separator
 *
 * @param {RuleOrLiteral} sep
 *
 * @param {RuleOrLiteral} rule
 *
 * @returns {ChoiceRule}
 */
function sepBy(sep, rule) {
  return optional(sepBy1(sep, rule));
}

/**
 * Creates a rule to match one or more of the rules separated by a separator
 *
 * @param {RuleOrLiteral} sep
 *
 * @param {RuleOrLiteral} rule
 *
 * @returns {SeqRule}
 */
function sepBy1(sep, rule) {
  return seq(rule, repeat(seq(sep, rule)));
}

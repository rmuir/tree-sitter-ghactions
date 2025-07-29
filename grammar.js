/**
 * @file Parser for Github Actions Expressions
 * @author Robert Muir <rmuir@apache.org>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

// https://docs.github.com/en/actions/reference/workflows-and-actions/expressions#operators
/* eslint-disable no-multi-spaces */
const PREC = {
  OR: 1,             // ||
  AND: 2,            // &&
  EQUALITY: 3,       // == !=
  REL: 4,            // < <= > >=
  UNARY: 5,          // !
  SUBSCRIPT: 6,      // []
  OBJ_ACCESS: 6,     // .
  PARENS: 6,         // ()
};
/* eslint-enable no-multi-spaces */

module.exports = grammar({
  name: 'ghactions',

  supertypes: $ => [
    $._expression,
  ],

  rules: {
    source: $ => repeat(choice(
      $._actions_expression,
      $.text,
    )),

    _actions_expression: $ => seq(
      '${{',
      $._expression,
      '}}',
    ),

    _expression: $ => choice(
      $.parenthesized_expression,
      $.dereference_expression,
      $.subscript_expression,
      $.unary_expression,
      $.binary_expression,
      $.function_call,
      $.identifier,
      $.number,
      $.string,
      $.true,
      $.false,
      $.null,
    ),

    parenthesized_expression: $ => prec.left(PREC.PARENS, seq(
      '(',
      $._expression,
      ')',
    )),

    dereference_expression: $ => prec.left(PREC.SUBSCRIPT, seq(
      field('object', choice(
        $._expression,
        '*')),
      '.',
      field('property', choice(
        $.identifier,
        '*')),
    )),

    subscript_expression: $ => prec.left(PREC.SUBSCRIPT, seq(
      field('argument', $._expression),
      '[',
      field('index', $._expression),
      ']',
    )),

    unary_expression: $ => choice(
      ...[
        ['!', PREC.UNARY],
      ].map(([operator, precedence]) =>
        prec.left(precedence, seq(
          // @ts-ignore
          field('operator', operator),
          field('operand', $._expression),
        )),
      )),

    binary_expression: $ => choice(
      ...[
        ['>', PREC.REL],
        ['<', PREC.REL],
        ['>=', PREC.REL],
        ['<=', PREC.REL],
        ['==', PREC.EQUALITY],
        ['!=', PREC.EQUALITY],
        ['&&', PREC.AND],
        ['||', PREC.OR],
      ].map(([operator, precedence]) =>
        prec.left(precedence, seq(
          field('left', $._expression),
          // @ts-ignore
          field('operator', operator),
          field('right', $._expression),
        )),
      )),

    function_call: $ => seq(
      field('name', $.identifier),
      field('arguments', $.argument_list),
    ),

    argument_list: $ => seq('(', commaSep($._expression), ')'),

    // identifiers can have hyphens
    identifier: _ => /[a-zA-Z_][a-zA-Z0-9_-]*/,

    // a javascript number (poached from tree-sitter-javascript)
    // documentation states "Any number format supported by JSON."
    // https://docs.github.com/en/actions/reference/evaluate-expressions-in-workflows-and-actions#literals
    // then immediately shows an example of a hexadecimal literal:
    // https://docs.github.com/en/actions/reference/evaluate-expressions-in-workflows-and-actions#example-of-literals
    number: _ => {
      const hexLiteral = seq(
        choice('0x', '0X'),
        /[\da-fA-F](_?[\da-fA-F])*/,
      );

      const decimalDigits = /\d(_?\d)*/;
      const signedInteger = seq(optional(choice('-', '+')), decimalDigits);
      const exponentPart = seq(choice('e', 'E'), signedInteger);

      const binaryLiteral = seq(choice('0b', '0B'), /[0-1](_?[0-1])*/);

      const octalLiteral = seq(choice('0o', '0O'), /[0-7](_?[0-7])*/);

      const bigintLiteral = seq(choice(hexLiteral, binaryLiteral, octalLiteral, decimalDigits), 'n');

      const decimalIntegerLiteral = choice(
        '0',
        seq(optional('0'), /[1-9]/, optional(seq(optional('_'), decimalDigits))),
      );

      const decimalLiteral = choice(
        seq(decimalIntegerLiteral, '.', optional(decimalDigits), optional(exponentPart)),
        seq('.', decimalDigits, optional(exponentPart)),
        seq(decimalIntegerLiteral, exponentPart),
        decimalDigits,
      );

      return token(seq(
        optional(choice(
          '-',
          '+')),
        choice(
          hexLiteral,
          decimalLiteral,
          binaryLiteral,
          octalLiteral,
          bigintLiteral,
        )));
    },

    string: $ => seq(
      '\'',
      repeat(choice(
        $.string_fragment,
        $.escape,
      )),
      '\'',
    ),

    string_fragment: _ => /[^']+/,
    escape: _ => token.immediate('\'\''),

    true: _ => 'true',

    false: _ => 'false',

    null: _ => 'null',

    // non expressions (e.g. normal string content)
    text: _ => token(repeat1(choice(
      /[^$\n]/,
      /[$][^{\n]/,
      /[$][{][^{\n]/,
    ))),
  },
});

/**
 * Creates a rule to optionally match one or more of the rules separated by a comma
 *
 * @param {RuleOrLiteral} rule
 *
 * @returns {ChoiceRule}
 */
function commaSep(rule) {
  return optional(seq(rule, repeat(seq(',', rule))));
}

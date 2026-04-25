const assert = require('node:assert');
const { test } = require('node:test');

const Parser = require('tree-sitter');
const ArkTS = require('.');

test('can load ArkTS grammar', () => {
  const parser = new Parser();
  assert.doesNotThrow(() => parser.setLanguage(ArkTS));
});

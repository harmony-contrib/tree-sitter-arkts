const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const Parser = require('tree-sitter');
const ArkTS = require('..');

const FIXTURE_DIR = path.join(__dirname, 'fixtures', 'hmosworld');

function collectEtsFiles(directory) {
  const files = [];
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectEtsFiles(entryPath));
    } else if (entry.isFile() && entry.name.endsWith('.ets')) {
      files.push(entryPath);
    }
  }

  return files.sort();
}

test('can parse every ETS file in the hmosworld fixture', () => {
  assert.ok(
    fs.existsSync(FIXTURE_DIR),
    'Expected hmosworld fixture submodule to exist. Run: git submodule update --init --depth 1 test/fixtures/hmosworld',
  );

  const files = collectEtsFiles(FIXTURE_DIR);

  assert.ok(
    files.length > 0,
    'Expected hmosworld fixture submodule to contain ETS files.',
  );

  const parser = new Parser();
  parser.setLanguage(ArkTS);

  const failures = [];

  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(path.join(__dirname, '..'), file);

    try {
      const tree = parser.parse(source);
      assert.ok(tree.rootNode, `${relativePath} did not produce a syntax tree`);
      if (tree.rootNode.hasError) {
        failures.push(`${relativePath}: produced ERROR nodes`);
      }
    } catch (error) {
      failures.push(`${relativePath}: ${error.message}`);
    }
  }

  assert.deepStrictEqual(failures, []);
});

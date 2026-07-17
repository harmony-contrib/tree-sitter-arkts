import {mkdir, readFile, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';

const corpusDir = path.join('test', 'corpus');
const outputRoot = path.join('build', 'corpus-fixtures');
const invalidFilesList = path.join('build', 'corpus-fixtures-invalid.txt');

const groups = [
  {
    name: 'arkts',
    extension: 'ets',
    files: ['arkts.txt'],
  },
  {
    name: 'javascript',
    extension: 'js',
    files: ['javascript.txt'],
  },
  {
    name: 'typescript',
    extension: 'ts',
    files: ['declarations.txt', 'expressions.txt', 'functions.txt', 'types.txt'],
  },
];

await rm(outputRoot, {force: true, recursive: true});

let fixtureCount = 0;
const invalidFixtures = [];

for (const group of groups) {
  const outputDir = path.join(outputRoot, group.name);
  await mkdir(outputDir, {recursive: true});

  for (const file of group.files) {
    const content = await readFile(path.join(corpusDir, file), 'utf8');
    const cases = extractCases(content);

    for (const [index, testCase] of cases.entries()) {
      const filename = [
        path.basename(file, '.txt'),
        String(index + 1).padStart(3, '0'),
        slugify(testCase.name),
      ].join('-');

      const fixturePath = path.join(outputDir, `${filename}.${group.extension}`);

      await writeFile(fixturePath, `${testCase.source.trimEnd()}\n`);

      if (testCase.expectedInvalid) {
        invalidFixtures.push(fixturePath.split(path.sep).join('/'));
      }
      fixtureCount += 1;
    }
  }
}

await writeFile(
  invalidFilesList,
  invalidFixtures.length > 0 ? `${invalidFixtures.join('\n')}\n` : '',
);

console.log(
  `Extracted ${fixtureCount} ArkTS/JS/TS corpus fixtures to ${outputRoot} ` +
  `(${invalidFixtures.length} expected invalid)`,
);

/**
 * Extract source snippets from a tree-sitter corpus file.
 *
 * @param {string} content
 * @returns {{name: string, source: string, expectedInvalid: boolean}[]}
 */
function extractCases(content) {
  const lines = content.split(/\r?\n/);
  const cases = [];

  for (let i = 0; i < lines.length; i += 1) {
    if (!isSeparator(lines[i])) continue;

    const name = lines[i + 1]?.trim();
    if (!name || !isSeparator(lines[i + 2])) continue;

    i += 3;

    while (i < lines.length && lines[i].startsWith(':')) i += 1;
    while (i < lines.length && lines[i] === '') i += 1;

    const source = [];
    while (i < lines.length && lines[i] !== '---') {
      source.push(lines[i]);
      i += 1;
    }

    const expected = [];
    if (lines[i] === '---') {
      i += 1;
      while (i < lines.length && !isSeparator(lines[i])) {
        expected.push(lines[i]);
        i += 1;
      }
      i -= 1;
    }

    const expectedTree = expected.join('\n').trim();

    cases.push({
      name,
      source: source.join('\n'),
      expectedInvalid: expectedTree === '' || /\((?:ERROR|MISSING)(?:\s|\))/.test(expectedTree),
    });
  }

  return cases;
}

/**
 * Check whether a line is a corpus section separator.
 *
 * @param {string} line
 * @returns {boolean}
 */
function isSeparator(line) {
  return /^=+$/.test(line);
}

/**
 * Convert a corpus case name to a stable filename segment.
 *
 * @param {string} value
 * @returns {string}
 */
function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'case';
}

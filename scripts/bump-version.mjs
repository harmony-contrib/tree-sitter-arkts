import {readFile, writeFile} from 'node:fs/promises';

const rawVersion = process.argv[2] || process.env.GITHUB_REF_NAME;
const version = rawVersion?.replace(/^v(?=\d+\.\d+\.\d+)/, '');

if (!version) {
  fail('Usage: node scripts/bump-version.mjs <version>');
}

if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
  fail(`Invalid version "${version}". Expected a semver version, for example 0.0.1-beta.0.`);
}

const cmakeVersion = version.split('-')[0];

await updateJson('package.json', (data) => {
  data.version = version;
});

await updateJson('package-lock.json', (data) => {
  data.version = version;
  if (data.packages?.['']) {
    data.packages[''].version = version;
  }
});

await replaceInFile(
  'Cargo.toml',
  /^version = ".*"$/m,
  `version = "${version}"`,
);

await replaceInFile(
  'Cargo.lock',
  /(\[\[package\]\]\nname = "tree-sitter-arkts"\nversion = ")[^"]+(")/,
  `$1${version}$2`,
);

await replaceInFile(
  'pyproject.toml',
  /^version = ".*"$/m,
  `version = "${version}"`,
);

await updateJson('tree-sitter.json', (data) => {
  data.metadata.version = version;
});

await replaceInFile(
  'common/common.mak',
  /^VERSION := .*$/m,
  `VERSION := ${version}`,
);

await replaceInFile(
  'CMakeLists.txt',
  /^        VERSION ".*"$/m,
  `        VERSION "${cmakeVersion}"`,
);

await replaceInFile(
  'CMakeLists.txt',
  /^set\(TREE_SITTER_ARKTS_VERSION ".*"\)$/m,
  `set(TREE_SITTER_ARKTS_VERSION "${version}")`,
);

console.log(`Updated project version to ${version}`);

/**
 * Update a JSON file while preserving two-space formatting.
 *
 * @param {string} file
 * @param {(data: object) => void} updater
 */
async function updateJson(file, updater) {
  const data = JSON.parse(await readFile(file, 'utf8'));
  updater(data);
  await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
}

/**
 * Replace a required pattern in a text file.
 *
 * @param {string} file
 * @param {RegExp} pattern
 * @param {string} replacement
 */
async function replaceInFile(file, pattern, replacement) {
  const content = await readFile(file, 'utf8');

  if (!pattern.test(content)) {
    fail(`Could not update ${file}: pattern ${pattern} did not match.`);
  }

  const next = content.replace(pattern, replacement);
  await writeFile(file, next);
}

/**
 * Print a message and exit with failure.
 *
 * @param {string} message
 */
function fail(message) {
  console.error(message);
  process.exit(1);
}

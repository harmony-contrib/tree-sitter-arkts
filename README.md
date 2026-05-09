# tree-sitter-arkts

[![CI][ci]](https://github.com/tree-sitter/tree-sitter-arkts/actions/workflows/ci.yml)
[![crates][crates]](https://crates.io/crates/tree-sitter-arkts)
[![npm][npm]](https://www.npmjs.com/package/tree-sitter-arkts)
[![pypi][pypi]](https://pypi.org/project/tree-sitter-arkts)

ArkTS grammar for [tree-sitter](https://github.com/tree-sitter/tree-sitter).

> This project is forked from [tree-sitter-typescript](https://github.com/tree-sitter/tree-sitter-typescript), but removed `jsx` `tsx` `flow`.

This package parses `.ets` ArkTS sources, including the ArkUI extensions used by the local `oxc` implementation such as:

- `struct` declarations
- `@interface` annotation declarations
- ArkUI component blocks like `Column() { ... }`
- leading-dot chains used by `@Extend`
- `import lazy`

## Usage

Node usage:

```js
const Parser = require("tree-sitter");
const ArkTS = require("tree-sitter-arkts");

const parser = new Parser();
parser.setLanguage(ArkTS);
```

[tree-sitter]: https://github.com/tree-sitter/tree-sitter

References

- [ArkTS Language Overview](https://developer.huawei.com/consumer/en/doc/harmonyos-guides-V5/arkts-overview-V5)

[ci]: https://img.shields.io/github/actions/workflow/status/tree-sitter/tree-sitter-arkts/ci.yml?logo=github&label=CI
[npm]: https://img.shields.io/npm/v/tree-sitter-arkts?logo=npm
[crates]: https://img.shields.io/crates/v/tree-sitter-arkts?logo=rust
[pypi]: https://img.shields.io/pypi/v/tree-sitter-arkts?logo=pypi&logoColor=ffd242

## Credits

- [tree-sitter](https://github.com/tree-sitter/tree-sitter)
- [tree-sitter-typescript](https://github.com/tree-sitter/tree-sitter-typescript)

## License

[MIT](./LICENSE)

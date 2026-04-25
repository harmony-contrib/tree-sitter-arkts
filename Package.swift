// swift-tools-version:5.3
import PackageDescription

let package = Package(
  name: "TreeSitterArkTS",
  products: [
    .library(name: "TreeSitterArkTS", targets: ["TreeSitterArkTS"]),
  ],
  dependencies: [
    .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
  ],
  targets: [
    .target(
      name: "TreeSitterArkTS",
      path: ".",
      sources: [
        "src/parser.c",
        "src/scanner.c",
      ],
      resources: [
        .copy("queries")
      ],
      publicHeadersPath: "bindings/swift/arkts",
      cSettings: [.headerSearchPath("src")]
    ),
    .testTarget(
      name: "TreeSitterArkTSTests",
      dependencies: [
        "SwiftTreeSitter",
        "TreeSitterArkTS",
      ],
      path: "bindings/swift/TreeSitterArkTSTests"
    )
  ]
)

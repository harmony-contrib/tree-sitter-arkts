import XCTest
import SwiftTreeSitter
import TreeSitterArkTS

final class TreeSitterArkTSTests: XCTestCase {
    func testCanLoadArkTSGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_arkts())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading ArkTS grammar")
    }
}

import SwiftTreeSitter
import TreeSitterGHActions
import XCTest

final class TreeSitterGHActionsTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_ghactions())
        XCTAssertNoThrow(
            try parser.setLanguage(language),
            "Error loading Github Actions grammar")
        if let tree = parser.parse("${{ example }}"), let root = tree.rootNode {
            XCTAssertFalse(root.hasError, root.sExpressionString!)
        } else {
            XCTFail("Error parsing Github Actions document")
        }
    }
}

import SwiftTreeSitter
import TreeSitterActions
import XCTest

final class TreeSitterActionsTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_actions())
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

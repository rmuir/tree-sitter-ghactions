import XCTest
import SwiftTreeSitter
import TreeSitterActions

final class TreeSitterActionsTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_actions())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Github Actions grammar")
    }
}

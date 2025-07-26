from unittest import TestCase

from tree_sitter import Language, Parser
import tree_sitter_actions


def language():
    return Language(tree_sitter_actions.language())


class TestLanguage(TestCase):
    def test_can_load_grammar(self):
        _ = language()

    def test_can_create_parser(self):
        _ = Parser(language())

    def test_can_parse(self):
        parser = Parser(language())
        doc = "${{ example }}".encode()
        tree = parser.parse(doc)
        assert not tree.root_node.has_error

package tree_sitter_actions_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_actions "github.com/rmuir/tree-sitter-actions/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_actions.Language())
	if language == nil {
		t.Errorf("Error loading Github Actions grammar")
	}
}

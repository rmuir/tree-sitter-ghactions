package tree_sitter_ghactions_test

import (
	"testing"

	tree_sitter_ghactions "github.com/rmuir/tree-sitter-ghactions/bindings/go"
	tree_sitter "github.com/tree-sitter/go-tree-sitter"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_ghactions.Language())
	if language == nil {
		t.Errorf("Error loading Github Actions grammar")
	}

	parser := tree_sitter.NewParser()
	if parser == nil {
		t.Errorf("Error creating Github Actions parser")
	}

	version_mismatch := parser.SetLanguage(language)
	if version_mismatch != nil {
		t.Errorf("Version mismatch creating Github Actions parser: %s", version_mismatch.Error())
	}

	tree := parser.Parse([]byte("${{ example }}"), nil)
	if tree.RootNode().HasError() {
		t.Errorf("Error parsing Github Actions sample: %s", tree.RootNode().ToSexp())
	}
}

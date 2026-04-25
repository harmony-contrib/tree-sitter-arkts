package tree_sitter_arkts

// #cgo CPPFLAGS: -I../../src
// #cgo CFLAGS: -std=c11 -fPIC
// #include "../../src/parser.c"
// #include "../../src/scanner.c"
import "C"

import "unsafe"

// Get the tree-sitter Language for ArkTS.
func Language() unsafe.Pointer {
	return unsafe.Pointer(C.tree_sitter_arkts())
}

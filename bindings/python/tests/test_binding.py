from unittest import TestCase

import tree_sitter, tree_sitter_arkts


class TestLanguage(TestCase):
    def test_can_load_arkts_grammar(self):
        try:
            tree_sitter.Language(tree_sitter_arkts.language())
        except Exception:
            self.fail("Error loading ArkTS grammar")

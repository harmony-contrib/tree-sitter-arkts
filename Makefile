TS ?= tree-sitter

all install uninstall clean:
	$(MAKE) -f common/common.mak LANGUAGE_NAME=tree-sitter-arkts DESCRIPTION='ArkTS grammar for tree-sitter' $@

test:
	$(TS) test
	$(TS) parse examples/* --quiet --time

.PHONY: all install uninstall clean test update

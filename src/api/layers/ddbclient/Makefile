#!make
MAKEFLAGS += --silent
.PHONY: build-DbClientLayer

build-DbClientLayer:
	npm install
	npm run build
	echo "$(ARTIFACTS_DIR)"
	mkdir -p "$(ARTIFACTS_DIR)/nodejs/node_modules"
	cp -r dist/ddbclient "$(ARTIFACTS_DIR)/nodejs/node_modules"



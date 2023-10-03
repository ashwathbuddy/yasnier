#!make
MAKEFLAGS += --silent
.PHONY: build-ApiResponsesLayer

build-ApiResponsesLayer:
	npm install
	npm run build
	echo "$(ARTIFACTS_DIR)"
	mkdir -p "$(ARTIFACTS_DIR)/nodejs/node_modules"
	cp -r dist/api-responses "$(ARTIFACTS_DIR)/nodejs/node_modules"



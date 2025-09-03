install:
	npm install

lint:
	npx eslint . --ext .js

test:
	npm test

.PHONY: test lint

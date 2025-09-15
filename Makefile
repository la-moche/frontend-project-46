install: deps-install
	npx simple-git-hooks -y

run:
	bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json

deps-install:
	npm ci

deps-update:
	npx ncu -u

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

publish:
	npx release-it

.PHONY: test

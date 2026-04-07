.PHONY: build test lint

build:
	@echo "Build successful (no compilation needed for Node.js)"

test:
	node src/server.test.js

lint:
	@node -c src/server.js
	@node -c src/server.test.js
	@echo "Lint passed"

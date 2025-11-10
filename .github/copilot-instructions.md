## Commit Message Guidelines

Commit messages must follow specific guidelines to ensure clarity and consistency in the project. Here are the rules to follow:
Commit messages must use the Conventional Commit format. For example:

```
feat: add new feature
fix: fix a bug
docs: update documentation
style: update styles
refactor: refactor code
test: add tests
chore: update dependencies
build: update build process
ci: update continuous integration
perf: improve performance
revert: revert to previous commit
```

The commit message must use the imperative mood; it should describe what the commit does, not what it did.

The commit message should be concise and to the point—ideally no more than 72 characters. If it exceeds 72 characters, wrap the text to the next line.

Commits are enforced by Husky and configured in the `.husky` directory.
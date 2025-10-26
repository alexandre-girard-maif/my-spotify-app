## Commit Message Guidelines

les messages de commit doivent suivre des directives spécifiques pour assurer la clarté et la cohérence dans le projet. Voici les règles à suivre :
Les messages de commit doivent utiliser le format de commit conventionnel. Par exemple :

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

Le message de commit doit être à l'impératif, c'est-à-dire qu'il doit décrire ce que fait le commit, et non ce qu'il a fait.

Le message de commit doit être concis et aller droit au but, idéalement pas plus de 72 caractères. Si le message de commit dépasse 72 caractères, il doit être enveloppé à la ligne suivante.

Les commits sont controlés par husky et parametré dans le répertoire `.husky`.
# 🐛 - Correction du bug d'affichage du nombre de playlists dans la page Playlists

## Objectif
La page `Playlists` affiche un nombre incorrect de playlists. Actuellement, le nombre affiché ne correspond pas au nombre réel de playlists récupérées depuis l'API Spotify. L'objectif de cette tâche est de corriger ce bug afin que le nombre de playlists affiché soit correct et reflète fidèlement les données récupérées.

Composant après correction du bug:

![Copie d'écran](playlists-count.png)

## Critères d'acceptation
- Le composant `TopArtistItem.jsx` doit afficher l'index des artistes en commençant à 1.
- Les tests dans `TopArtistItem.test.jsx` doivent refléter cette modification et passer avec succès après la correction.

## Conseils d'implémentation

Adopter la méthode **TDD** (**T**est-**D**riven **D**evelopment) pour corriger ce bug en suivant les étapes ci-dessous :
1. Exécuter les tests existants dans `TopArtistItem.test.jsx`, celui-ci n'échouera pas car le bug n'est pas encore corrigé et le test n'est pas suffisant.
2. Modifier les tests dans `TopArtistItem.test.jsx` pour refléter le bug pas encore corrigé, le test doit échouer avant la correction, (vérification que le libellé avec le nom de l'artiste inclut l'index correct 1 si l'index est 0).
3. Corriger l'affichage de l'index dans le composant `TopArtistItem.jsx` pour qu'il commence à 1 au lieu de 0.
4. Les tests doivent dorénavant passer avec succès après la correction.

En respectant cette approche, nous garantissons que le bug est correctement identifié et corrigé tout en maintenant la qualité du code grâce à l'écriture de tests appropriés.

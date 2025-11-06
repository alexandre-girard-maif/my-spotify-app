# Correction du bug d'index dans TopArtistItem.jsx

## Problème
Le composant `TopArtistItem.jsx` affiche un index incorrect pour les artistes. Actuellement, l'index commence à 0, ce qui n'est pas intuitif pour les utilisateurs. 

## Correction

Adopter la méthode **TDD** (**T**est-**D**riven **D**evelopment) pour corriger ce bug en suivant les étapes ci-dessous :
1. Exécuter les tests existants dans `TopArtistItem.test.jsx`, celui-ci n'échouera pas car le bug n'est pas encore corrigé et le test n'est pas suffisant.
2. Modifier les tests dans `TopArtistItem.test.jsx` pour refléter le bug pas encore corrigé, le test doit échouer avant la correction, (vérification que le libellé avec le nom de l'artiste inclut l'index correct 1 si l'index est 0).
3. Corriger l'affichage de l'index dans le composant `TopArtistItem.jsx` pour qu'il commence à 1 au lieu de 0.
4. Les tests doivent dorénavant passer avec succès après la correction.

En respectant cette approche, nous garantissons que le bug est correctement identifié et corrigé tout en maintenant la qualité du code grâce aux tests automatisés.

## Critères d'acceptation
- Le composant `TopArtistItem.jsx` doit afficher l'index des artistes en commençant à 1.
- Tous les tests dans `TopArtistItem.test.jsx` doivent passer avec succès après la correction.
- Le code doit respecter les normes de style et de qualité existantes dans le projet.


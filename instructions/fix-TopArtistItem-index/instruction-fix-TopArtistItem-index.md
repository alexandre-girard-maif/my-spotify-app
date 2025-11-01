# Correction du bug d'index dans TopArtistItem.jsx

## Problème
Le composant `TopArtistItem.jsx` affiche un index incorrect pour les artistes. Actuellement, l'index commence à 0, ce qui n'est pas intuitif pour les utilisateurs. 

## Correction

- Corriger l'affichage de l'index dans le composant `TopArtistItem.jsx` pour qu'il commence à 1 au lieu de 0.
- Mettre à jour les tests associés dans `TopArtistItem.test.jsx` pour refléter ce changement en renforçant les assertions sur l'index affiché.

# ✨ - Ajout de la page de tableau de bord

## Objectif

Créer une page de tableau de bord pour afficher un aperçu des informations Spotify de l'utilisateur avec les fonctionnalités suivantes :

- Afficher l'artiste le plus écouté
- Afficher la piste la plus écoutée

1. **Récupération des données utilisateur** :
   - La fonction **fetchUserTopArtists** permet de récupérer les artistes les plus écoutés de l'utilisateur, le paramètre `limit` peut être utilisé pour définir le nombre d'artistes à récupérer.
   - Gérer les erreurs potentielles lors de la récupération des données.

2. **Récupération des pistes utilisateur** :
   - La fonction **fetchUserTopTracks** permet de récupérer les pistes les plus écoutées de l'utilisateur, le paramètre `limit` peut être utilisé pour définir le nombre de pistes à récupérer.
   - Gérer les erreurs potentielles lors de la récupération des données.

3. **Affichage des informations** :
   - Afficher l'artiste le plus écouté avec son nom et son image et ses genres musicaux.
   - Afficher la piste la plus écoutée avec son nom, le nom de l'artiste et l'image de l'album et les artistes associés.

![Copie d'écran](https://github.com/alexandre-girard-maif/music-discovery-app-template/blob/develop/instructions/feature-dashboard-page/dashboard-page.png?raw=true)

## Critères d'acceptation
- La page du tableau de bord doit afficher correctement l'artiste le plus écouté et la piste la plus écoutée. 
- Les erreurs lors de la récupération des données doivent être gérées et affichées de manière appropriée.
- Les tests doivent être passés avec succès avec le test `instructions/feature-dashboard-page/ressources/DashboardPage.test.jsx` à déplacer dans les sources.
- Le style de la page doit utiliser `src/styles/DashboardPage.css`.

## Conseils d'implémentation
Procédez par étapes pour implémenter cette fonctionnalité et testez chaque partie au fur et à mesure :
- Commencer par créer une nouvelle route pour la page du tableau de bord, elle devrait être accessible via une URL comme `/dashboard`.
- Créer un nouveau composant React `DashboardPage` qui sera responsable de l'affichage des informations du tableau de bord.
   - Dans un premier temps mettre en place une page statique avec uniquement un titre afin de vérifier que la navigation fonctionne correctement.
- Utiliser la fonction `fetchUserTopArtists` pour récupérer les données des artistes les plus écoutés de l'utilisateur et afficher le résultat dans la console pour vérifier que les données sont correctement récupérées et le format des données. Par exemple, pour accéder au premier artiste, vous pouvez utiliser : `topArtists.items[0]`.
- Mettre en place l'affichage de l'artiste le plus écouté avec son nom, son image et ses genres musicaux.
- Utiliser la fonction `fetchUserTopTracks` pour récupérer les données des pistes les plus écoutées de l'utilisateur et afficher le résultat dans la console pour vérifier que les données sont correctement récupérées et le format des données. Par exemple, pour accéder à la première piste, vous pouvez utiliser : `topTracks.items[0]`.
- Mettre en place l'affichage de la piste la plus écoutée avec son nom, le nom de l'artiste, l'image de l'album et les artistes associés.
- Le composant `SimpleCard` peut être réutilisé pour afficher l'artiste et la piste.
- Ajouter les tests nécessaires pour valider le bon fonctionnement de la page du tableau de bord en déplaçant le test fourni `instructions/feature-dashboard-page/ressources/DashboardPage.test.jsx` dans les sources.
- Ajouter des tests supplémentaires si nécessaire pour couvrir les cas d'erreur lors de la récupération des données.

Des commits clairs et descriptifs doivent être faits à chaque étape pour permettre une revue de code efficace.

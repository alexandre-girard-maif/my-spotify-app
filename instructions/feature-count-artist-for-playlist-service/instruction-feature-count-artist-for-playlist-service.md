# ✨ - Ajout d'un service permettant de compter le nombre d'apparitions d'un artiste dans une playlist Spotify

## Objectif

Ajouter un service `artistCountForPlaylist` permettant de compter le nombre d'apparitions d'un artiste spécifique dans une playlist Spotify donnée.

## Instructions

1. **Créer le service**  
   Créez un nouveau fichier `src/services/artist-count-for-playlist.js`. Ce fichier contiendra la logique pour compter les apparitions d'un artiste dans une playlist.
2. **Implémenter la fonction**  
   Dans ce fichier, implémentez une fonction asynchrone `artistCountForPlaylist(token, playlistId)` qui :
    - Prend en paramètres un token d accès Spotify et l'ID d'une playlist.
    - Utilise l'API Spotify déjà existante `fetchPlaylistById` pour récupérer les pistes de la playlist.
    - Parcourt les pistes de la playlist et compte combien de fois chaque artiste apparaît.
    - Retourne un objet contenant le nom de chaque artiste et le nombre d'apparitions dans la playlist.
3. **Gérer les erreurs**  
   Assurez-vous de gérer les erreurs potentielles, telles que les erreurs lors de la récupération des données de la playlist.
4. **Écrire des tests unitaires**
    Déplacer le fichier `instructions/feature-count-artist-for-playlist-service/ressources/artist-count-for-playlist.test.js` vers `src/services/artist-count-for-playlist.test.js`.
    Vérifiez que les tests sont passants, si ce n'est pas le cas, corrigez les erreurs dans l'implémentation du service.

## Critères d'acceptation
- Le service `artistCountForPlaylist` est correctement implémenté et exporté depuis `src/services/artist-count-for-playlist.js`.
- La fonction `artistCountForPlaylist` retourne un objet avec le nom des artistes et le nombre d'apparitions dans la playlist.
- Les erreurs sont correctement gérées.
- Les tests unitaires pour le service `artistCountForPlaylist` sont présents dans `src/services/artist-count-for-playlist.test.js` et passent avec succès.
    
## Conseils d'implémentation
Le script [spotify-api-sandbox.cjs](../../scripts/spotify-api-sandbox.cjs) peut être utilisé pour tester rapidement votre service en local. Il est déjà fonctionnel pour tester des appels à l'API Spotify. Vous pouvez l'adapter ou le dupliquer pour appeler votre service `artistCountForPlaylist` avec un token d'accès valide et une playlist ID et afficher les résultats dans la console.

L'execution du script peut être faite avec la commande suivante :

```bash
node ./scripts/spotify-api-sandbox.cjs
```

Le script nécessite que vous ayez un fichier `.env.local` à la racine du projet avec les variables d'environnement nécessaires pour l'authentification avec l'API Spotify (voir le fichier `.env.sample` pour les variables requises).

Un exemple de résultat en sortie de console pourrait ressembler à ceci avec la playlist d'id `2IgPkhcHbgQ4s4PdCxljAx` et en limitant l'affichage aux 5 artistes les plus présents :

``` sh
Top 5 Artists:
┌─────────┬───────────────┬──────────────────┐
│ (index) │ Artist        │ Number of Tracks │
├─────────┼───────────────┼──────────────────┤
│ 0       │ 'GIMS'        │ 7                │
│ 1       │ 'La Mano 1.9' │ 4                │
│ 2       │ 'GP Explorer' │ 4                │
│ 3       │ 'Jul'         │ 4                │
│ 4       │ 'Orelsan'     │ 3                │
└─────────┴───────────────┴──────────────────┘
```
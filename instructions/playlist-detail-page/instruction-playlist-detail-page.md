# Playlist Detail Page Instructions

<img width="1382" height="827" alt="Image" src="https://github.com/user-attachments/assets/2ebe6778-9c2e-44af-8379-a6e746a39a4f" />

## Objectif

Créer une page de détail pour afficher les informations d'une playlist Spotify spécifique avec les fonctionnalités suivantes :

1. **Récupération des données de la playlist** :
   - La fonction **fetchPlaylistById** permet de récupérer les informations d'une playlist et ses pistes en utilisant l'ID de la playlist.
   - Gérer les erreurs potentielles lors de la récupération des données.

2. **Affichage des informations de la playlist** :
   - Afficher le nom de la playlist, la description et l'image de couverture en haut de la page.
   - Afficher la liste des pistes avec les informations déjà présentées dans la page **Top Tracks**.
   - Gérer les cas où la playlist est vide ou n'existe pas ou en cas d'erreur de récupération des données.

3. **Fonctionnalités supplémentaires** :
   - Ajouter un bouton "Lire la playlist" qui ouvre la playlist dans l'application Spotify.
   - Permettre d'accéder à la page de détail de la playlist en cliquant sur une playlist dans la liste des playlists.

## Critères d'acceptation
- La page de détail de la playlist doit afficher correctement les informations de la playlist et la liste des pistes.
- Les erreurs lors de la récupération des données doivent être gérées et affichées de manière appropriée.
- Les fonctionnalités supplémentaires doivent être implémentées et fonctionner correctement.
- Les tests doivent être passés avec succès avec le test `instructions/playlist-detail-page/ressources/PlaylistPage.test.jsx` à déplacer dans les sources.
- Le style de la page doit utiliser `src/styles/PlaylistDetailPage.css`.

## Conseils d'implémentation

Procédez par étapes pour implémenter cette fonctionnalité et testez chaque partie au fur et à mesure :
- Commencer par créer une nouvelle route pour la page de détail de la playlist, elle devrait être accessible via une URL comme `/playlist/:id`.
- Créer un nouveau composant React `PlaylistDetailPage` qui sera responsable de l'affichage des informations de la playlist en se basant sur une page existante comme `TopTracksPage`.
   - Dans un premier temps mettre en place une page statique avec uniquement un titre et le paramètre d'ID de la playlist afin de vérifier que la navigation fonctionne correctement, l'ID de la playlist peut être récupéré via les paramètres de l'URL (React Router `useParams`).
- Utiliser la fonction `fetchPlaylistById` pour récupérer les données de la playlist en utilisant l'ID récupéré depuis les paramètres de l'URL et afficher le résultat dans la console pour vérifier que les données sont correctement récupérées et le format des données. Par exemple, pour accéder à la première piste de la playlist, vous pouvez utiliser : `playlist.tracks.items[0].track`.
- Mettre en place l'affichage des informations de la playlist (nom, description, image de couverture, lien) en haut de la page.
- Implémenter l'affichage de la liste des pistes de la playlist, le composant **TrackItem** peut être réutilisé pour afficher chaque piste.
- Modifier le composant `src/components/PlayListItem.jsx` pour modifier un lien vers la page de détail de la playlist en utilisant l'ID de la playlist lorsque l'utilisateur clique sur une playlist dans la liste des playlists. Modifier également le test, l'implémentation ayant changé.

# Playlist Detail Page Instructions

Créer une page de détail pour afficher les informations d'une playlist Spotify spécifique avec les fonctionnalités suivantes :

1. **Récupération des données de la playlist** :
   - La fonction **fetchPlaylistById** permet de récupérer les informations d'une playlist et ses pistes en utilisant l'ID de la playlist.
   - Gérer les erreurs potentielles lors de la récupération des données.

2. **Affichage des informations de la playlist** :
   - Afficher le nom de la playlist, la description et l'image de couverture en haut de la page.
   - Afficher la liste des pistes avec les informations déjà présentées dans la page **Top Tracks**.

3. **Fonctionnalités supplémentaires** :
   - Ajouter un bouton "Lire la playlist" qui ouvre la playlist dans l'application Spotify.
   - Ajouter une pagination ou un chargement infini si la playlist contient un grand nombre de pistes.
   - Permettre aux utilisateurs de trier les pistes par titre, artiste ou durée.

4. **Navigation** :
   - Ajouter un lien de retour à la page précédente ou à la liste des playlists.
5. **Tests** :
   - Écrire des tests unitaires pour les fonctions de récupération des données et de rendu des composants.
   - Écrire des tests d'intégration pour vérifier que la page de détail de la playlist fonctionne correctement avec l'API Spotify.

## Critères d'acceptation
- La page de détail de la playlist doit afficher correctement les informations de la playlist et la liste des pistes.
- Les erreurs lors de la récupération des données doivent être gérées et affichées de manière appropriée.
- Les fonctionnalités supplémentaires doivent être implémentées et fonctionner correctement.
- Les tests doivent couvrir les principales fonctionnalités de la page de détail de la playlist.    
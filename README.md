[![Build and Test](https://github.com/alexandre-girard-maif/music-discovery-app-template/actions/workflows/ci.yml/badge.svg)](https://github.com/alexandre-girard-maif/music-discovery-app-template/actions/workflows/ci.yml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=alexandre-girard-maif_music-discovery-app-template&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=alexandre-girard-maif_music-discovery-app-template)  [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=alexandre-girard-maif_music-discovery-app-template&metric=coverage)](https://sonarcloud.io/summary/new_code?id=alexandre-girard-maif_music-discovery-app-template)


# Music Discovery App

Application permettant d'intéroger l'API Spotify pour découvrir de la musique en fonction des préférences utilisateur.

## Fonctionnalités

- Authentification utilisateur avec Spotify
- Affichage des titres, artistes et playlists favoris

## Installation

1. Cloner le dépôt
2. Installer les dépendances
    ```bash
    npm install
    ```
3. Créer un fichier `.env.local` avec vos identifiants API Spotify, vous pouvez vous référer au fichier `.env.sample` pour les variables requises:
    ```env
    VITE_SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
    ```
4. Démarrer le serveur de développement
    ```bash
    npm start
    ``` 
5. Ouvrir votre navigateur et naviguer vers `http://127.0.0.1:5173`

## Utilisation de l'API Spotify

Pour utiliser l'API Spotify, vous devez d'abord créer une application sur le [Tableau de bord des développeurs Spotify](https://developer.spotify.com/dashboard/applications). Une fois l'application créée, vous obtiendrez un `Client ID` et un `Client Secret`. Utilisez ces informations pour configurer votre fichier `.env.local`. Assurez-vous également de définir les URI de redirection appropriés dans les paramètres de votre application Spotify pour permettre l'authentification OAuth.

![Spotify Dashboard](assets/spotify-dashboard.png)

**Attention:** ne partagez jamais votre `Client Secret` publiquement ou dans votre code source. 

Le fichier `.env.local` est ignoré par Git grâce au fichier `.gitignore`, ce qui aide à protéger vos informations sensibles.
## Instructions Globales

Ces instructions globales s'appliquent à toutes évolutions de l'application Spotify. Assurez-vous de suivre ces directives lors du développement de nouvelles fonctionnalités ou de la modification des fonctionnalités existantes.

### 1. Processus de développement

Mettre en place la configuration nécessaire de votre projet **github** pour permettre un développement efficace, sécurisé et collaboratif.

Chaque développement de fonctionnalité ou correction de bug doit être validé par le **lead developer** (alexandre-girard-maif).

Il doit être possible de développer chaque fonctionnalité de manière indépendante et en parallèle.

Libre à vous de choisir quand une fonctionnalité (une fois validée par le lead developer) pourra être intégrée dans la branche principale `main` pour une nouvelle version de l'application.

Le numéro de version doit suivre les bonnes pratiques de gestion de versions sémantiques (semver).

### 1. Qualité du développement

En vous inspirant de ce qui a été fait pour le projet **marvel-app**, assurez-vous de respecter les points suivants en respectant les bonnes pratiques de développement et en paramétrant correctement le projet :

- Faites en sorte de pouvoir développer les différentes **features** de manières indépendantes
- Permettre une revue de code efficace
    - Commit clairs et descriptifs
    - Pull request bien documentées

### 2. Qualité du Code

- Faites en sorte que votre code soit propre, lisible et bien structuré.
- Utilisez des composants réutilisables lorsque cela est possible
- Faites en sorte que chaque fonctionnalité soit testable de manière isolée

### 3. Processus de validation

- Chaque fonctionnalité doit être accompagnée de tests unitaires.
- La livraison de chaque fonctionnalité doit être validée par un **lead developer** avant d'être fusionnée dans la branche de développement.
- Une fois que la fonctionnalité a été validée et présente dans la branche de développement, à vous de décider quand vous souhaitez fusionner la branche de développement dans la branche **main** pour une nouvelle version de l'application. 
    - En suivant les bonnes pratiques de gestion de versions sémantiques (semver).
    - En passant par une phase de **recette** afin de valider que tout fonctionne correctement avant la mise en production.
    - En passant la phase de **Qualimétrie** pour s'assurer que la qualité du code est maintenue.
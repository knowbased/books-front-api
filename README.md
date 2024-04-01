# Bibliothèque API et Frontend

Ce projet est une application de gestion de bibliothèque comprenant une API REST pour gérer les ressources de la bibliothèque (livres, auteurs, emprunts) et un frontend utilisateur simple pour interagir avec l'API.

## Lancement du projet

1. Assurez-vous d'avoir [pnpm](https://pnpm.io/) installé sur votre machine.
2. Clonez ce dépôt sur votre machine.
3. Naviguez vers le répertoire racine du projet.
4. Installez les dépendances en exécutant la commande suivante : `pnpm install`.
5. Lancez l'API et le frontend en exécutant la commande suivante : `pnpm dev`
6. L'API sera disponible sur `http://localhost:3000`.
7. Le frontend sera disponible sur `http://localhost:5173`.

## Lancement des Tests

Vous pouvez exécuter les tests en utilisant la commande suivante : `pnpm test`.

## Fonctionnalités

- **Gestion des Livres :** Création, lecture, mise à jour et suppression de livres. Recherche de livres par titre, auteur ou genre.
- **Gestion des Auteurs :** Création, lecture, mise à jour et suppression d'auteurs. Récupération des livres écrits par un auteur donné.
- **Gestion des Emprunts :** Création et retour d'emprunts. Recherche des emprunts par utilisateur ou par livre.

## Structure du Projet

- **apps/api/** : Contient le code source de l'API.
- **apps/front/** : Contient le code source du frontend.

## Technologies Utilisées

- [NestJS](https://nestjs.com/) pour le développement de l'API.
- [React](https://reactjs.org/) pour le développement du frontend.
- [TypeORM](https://typeorm.io/) pour la gestion de la base de données.

# Cahier de Test

## Introduction

Ce document décrit les cas de test pour valider les fonctionnalités du projet. Il est structuré en deux parties : les tests du frontend (React) et les tests du backend (Java Spring Boot).

## Tests Frontend (React)

### Test 1: Affichage de la page d'accueil

**Description :** Vérifier que la page d'accueil s'affiche correctement.

**Préconditions :**
- Le serveur frontend est démarré.

**Étapes :**
1. Ouvrir le navigateur web.
2. Accéder à l'URL : http://localhost:3000

**Résultats attendus :**
- La page d'accueil s'affiche avec le logo et le titre du projet.
- Les boutons de navigation sont visibles.

### Test 2: Recherche dans l'annuaire

**Description :** Vérifier que la fonctionnalité de recherche fonctionne correctement.

**Préconditions :**
- La page d'accueil est accessible.

**Étapes :**
1. Saisir un terme de recherche dans la barre de recherche.
2. Cliquer sur le bouton de recherche.

**Résultats attendus :**
- Les résultats correspondant au terme de recherche s'affichent.
- Les résultats sont pertinents et bien formatés.

### Test 3: Ajout d'un utilisateur

**Description :** Vérifier que l'ajout d'un nouvel utilisateur fonctionne correctement.

**Préconditions :**
- La page d'administration est accessible.

**Étapes :**
1. Accéder à la page d'administration.
2. Cliquer sur "Ajouter un utilisateur".
3. Remplir le formulaire avec les informations de l'utilisateur.
4. Soumettre le formulaire.

**Résultats attendus :**
- L'utilisateur est ajouté à l'annuaire.
- Un message de confirmation s'affiche.

### Test 4: Modification d'un utilisateur

**Description :** Vérifier que la modification d'un utilisateur fonctionne correctement.

**Préconditions :**
- La page d'administration est accessible.
- Un utilisateur existe dans l'annuaire.

**Étapes :**
1. Accéder à la page d'administration.
2. Sélectionner un utilisateur existant.
3. Cliquer sur "Modifier".
4. Modifier les informations de l'utilisateur.
5. Soumettre le formulaire.

**Résultats attendus :**
- Les informations de l'utilisateur sont mises à jour.
- Un message de confirmation s'affiche.

### Test 5: Suppression d'un utilisateur

**Description :** Vérifier que la suppression d'un utilisateur fonctionne correctement.

**Préconditions :**
- La page d'administration est accessible.
- Un utilisateur existe dans l'annuaire.

**Étapes :**
1. Accéder à la page d'administration.
2. Sélectionner un utilisateur existant.
3. Cliquer sur "Supprimer".
4. Confirmer la suppression.

**Résultats attendus :**
- L'utilisateur est supprimé de l'annuaire.
- Un message de confirmation s'affiche.

## Tests Backend (Java Spring Boot)

### Test 1: Endpoint de création d'utilisateur

**Description :** Vérifier que l'endpoint de création d'utilisateur fonctionne correctement.

**Préconditions :**
- Le serveur backend est démarré.

**Étapes :**
1. Envoyer une requête POST à l'endpoint `/api/users` avec les informations de l'utilisateur.

**Résultats attendus :**
- L'utilisateur est créé dans la base de données.
- La réponse contient les détails de l'utilisateur créé.

### Test 2: Endpoint de lecture d'utilisateur

**Description :** Vérifier que l'endpoint de lecture d'utilisateur fonctionne correctement.

**Préconditions :**
- Le serveur backend est démarré.
- Un utilisateur existe dans la base de données.

**Étapes :**
1. Envoyer une requête GET à l'endpoint `/api/users/{id}` avec l'ID de l'utilisateur.

**Résultats attendus :**
- La réponse contient les détails de l'utilisateur correspondant à l'ID fourni.

### Test 3: Endpoint de mise à jour d'utilisateur

**Description :** Vérifier que l'endpoint de mise à jour d'utilisateur fonctionne correctement.

**Préconditions :**
- Le serveur backend est démarré.
- Un utilisateur existe dans la base de données.

**Étapes :**
1. Envoyer une requête PUT à l'endpoint `/api/users/{id}` avec les nouvelles informations de l'utilisateur.

**Résultats attendus :**
- Les informations de l'utilisateur sont mises à jour dans la base de données.
- La réponse contient les détails de l'utilisateur mis à jour.

### Test 4: Endpoint de suppression d'utilisateur

**Description :** Vérifier que l'endpoint de suppression d'utilisateur fonctionne correctement.

**Préconditions :**
- Le serveur backend est démarré.
- Un utilisateur existe dans la base de données.

**Étapes :**
1. Envoyer une requête DELETE à l'endpoint `/api/users/{id}` avec l'ID de l'utilisateur.

**Résultats attendus :**
- L'utilisateur est supprimé de la base de données.
- La réponse confirme la suppression de l'utilisateur.

### Test 5: Endpoint de recherche d'utilisateurs

**Description :** Vérifier que l'endpoint de recherche d'utilisateurs fonctionne correctement.

**Préconditions :**
- Le serveur backend est démarré.
- Des utilisateurs existent dans la base de données.

**Étapes :**
1. Envoyer une requête GET à l'endpoint `/api/users/search?query={searchTerm}` avec un terme de recherche.

**Résultats attendus :**
- La réponse contient une liste d'utilisateurs correspondant au terme de recherche.

## Conclusion

Ce cahier de test couvre les fonctionnalités principales du frontend et du backend du projet. Il est recommandé d'exécuter ces tests régulièrement pour assurer la qualité et la stabilité du projet. Les résultats des tests doivent être documentés pour faciliter le suivi et la résolution des problèmes.

# Procédure d'installation du projet

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :
- [Node.js](https://nodejs.org/) (version 14.x ou plus récente)
- [npm](https://www.npmjs.com/) (généralement inclus avec Node.js)
- [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html) (version 11 ou plus récente)
- [Maven](https://maven.apache.org/) (pour la gestion des dépendances Java)
- [Git](https://git-scm.com/) (pour cloner le repository)
- [MySQL](https://www.mysql.com/) ou une autre base de données compatible

## Clonage du repository

Commencez par cloner le repository GitHub sur votre machine locale :

\`\`\`bash
git clone https://github.com/tymacz/front-annuaire.git
cd front-annuaire
\`\`\`

## Installation du frontend React

1. Accédez au répertoire du frontend React :

\`\`\`bash
cd frontend
\`\`\`

2. Installez les dépendances :

\`\`\`bash
npm install
\`\`\`

3. Installez Material-UI (si ce n'est pas déjà fait) :

\`\`\`bash
npm install @mui/material @emotion/react @emotion/styled
\`\`\`

4. Pour démarrer l'application React en mode développement :

\`\`\`bash
npm start
\`\`\`

L'application devrait maintenant être accessible sur [http://localhost:3000](http://localhost:3000).

## Installation de l'API Java

1. Accédez au répertoire de l'API Java :

\`\`\`bash
cd ../backend
\`\`\`

2. Utilisez Maven pour installer les dépendances et compiler le projet :

\`\`\`bash
mvn clean install
\`\`\`

3. Pour démarrer l'API Java :

\`\`\`bash
mvn spring-boot:run
\`\`\`

L'API devrait maintenant être accessible sur [http://localhost:8080](http://localhost:8080).

## Importation du dump SQL

1. Assurez-vous que MySQL est installé et en cours d'exécution.
2. Créez une base de données pour votre projet :

\`\`\`sql
CREATE DATABASE nom_de_votre_base_de_donnees;
\`\`\`

3. Importez le dump SQL dans la base de données. Remplacez \`nom_de_votre_dump.sql\` par le nom de votre fichier dump :

\`\`\`bash
mysql -u nom_utilisateur -p nom_de_votre_base_de_donnees < chemin/vers/nom_de_votre_dump.sql
\`\`\`

## Configuration

Assurez-vous que les fichiers de configuration pour le frontend et le backend sont correctement configurés pour se connecter l'un à l'autre et à la base de données. Cela peut inclure la modification des fichiers \`.env\` pour React et des fichiers de configuration \`application.properties\` ou \`application.yml\` pour Spring Boot.

## Résumé des commandes

\`\`\`bash
# Cloner le repository
git clone https://github.com/tymacz/front-annuaire.git
cd front-annuaire

# Installer et démarrer le frontend React
cd frontend
npm install
npm install @mui/material @emotion/react @emotion/styled
npm start

# Installer et démarrer l'API Java
cd ../backend
mvn clean install
mvn spring-boot:run

# Importer le dump SQL
# (exécuter ces commandes dans le terminal MySQL)
CREATE DATABASE nom_de_votre_base_de_donnees;
mysql -u nom_utilisateur -p nom_de_votre_base_de_donnees < chemin/vers/nom_de_votre_dump.sql
\`\`\`

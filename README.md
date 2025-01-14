# TP-Positionnement

## Instructions pour démarrer le projet

### Étape 1 : Configuration de la base de données MySQL avec Docker

1. Téléchargez l'image MySQL via Docker :
   ```bash
   docker pull mysql
   ```

2. Lancez un conteneur MySQL avec les paramètres nécessaires :
   ```bash
   docker run --name nom_du_conteneur -e MYSQL_ROOT_PASSWORD=mot_de_passe_root -e MYSQL_DATABASE=nom_de_la_base -e MYSQL_USER=nom_utilisateur -e MYSQL_PASSWORD=mot_de_passe_utilisateur -p 3306:3306 -d mysql:latest
   ```

   **Remarque :** Remplacez `nom_du_conteneur`, `mot_de_passe_root`, `nom_de_la_base`, `nom_utilisateur` et `mot_de_passe_utilisateur` par les valeurs souhaitées.

---

### Étape 2 : Création du fichier `.env`

Créez un fichier nommé `.env` à la racine du projet avec le contenu suivant :

```env
PORT=3000
DB_HOST=localhost
DB_USER=nom_utilisateur
DB_PASSWORD=mot_de_passe_utilisateur
DB_DATABASE=nom_de_la_base
DB_PORT=3306
```

- Assurez-vous que les valeurs de `DB_USER`, `DB_PASSWORD`, et `DB_DATABASE` correspondent aux paramètres utilisés lors du lancement du conteneur Docker.

---

### Étape 3 : Démarrage de l'application

Une fois la base de données configurée et le fichier `.env` en place, suivez les étapes classiques pour démarrer l'application Node.js.
```bash
npm install
npm start
```

Vous pouvez maintenant accéder à l'application via [http://localhost:3000](http://localhost:3000).
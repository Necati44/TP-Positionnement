import { createConnection } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export var connection = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306,  // Si DB_PORT n'est pas défini, utilise 3306 par défaut
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

// Fonction pour créer les tables
function createTables() {
	// Table Utilisateur
	const createUserTable = `
    CREATE TABLE IF NOT EXISTS utilisateur (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('formateur', 'etudiant') NOT NULL
    );
  `;

	// Table Session
	const createSessionTable = `
    CREATE TABLE IF NOT EXISTS session (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      formateur_id INT NOT NULL,
      FOREIGN KEY (formateur_id) REFERENCES utilisateur(id)
    );
  `;

	// Table Émargement
	const createEmargementTable = `
    CREATE TABLE IF NOT EXISTS emargement (
      id INT AUTO_INCREMENT PRIMARY KEY,
      session_id INT NOT NULL,
      etudiant_id INT NOT NULL,
      status BOOLEAN NOT NULL,
      FOREIGN KEY (session_id) REFERENCES session(id),
      FOREIGN KEY (etudiant_id) REFERENCES utilisateur(id)
    );
  `;

	// Exécution des requêtes pour créer les tables
	connection.query(createUserTable, (err) => {
		if (err) {
			console.error('Error creating table "utilisateur": ' + err.stack);
			return;
		}

		connection.query(createSessionTable, (err) => {
			if (err) {
				console.error('Error creating table "session": ' + err.stack);
				return;
			}

			connection.query(createEmargementTable, (err) => {
				if (err) {
					console.error('Error creating table "emargement": ' + err.stack);
					return;
				}
			});
		});
	});
}

createTables();

process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing the database connection', err);
    } else {
      console.log('Database connection closed');
    }
    process.exit();
  });
});

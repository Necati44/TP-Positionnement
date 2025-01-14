import { z } from "zod";
import { connection } from '../database/init.js';

// Définition du modèle Utilisateur avec Zod
const Utilisateur = z.object({
    id: z.number().int(),  // Utilisation de number pour les entiers en JS
    name: z.string().min(1), // Assurer que le nom est une chaîne de caractères non vide
    email: z.string().email(), // Validation de l'email
    password: z.string().min(6), // Validation du mot de passe (par exemple, un minimum de 6 caractères)
    role: z.enum(['formateur', 'etudiant']), // Validation du rôle
});

// Fonctions pour interagir avec la base de données

// Récupérer tous les utilisateurs
export const getAllUtilisateurs = async () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM utilisateur', (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};

// Créer un utilisateur
export const createUtilisateur = async (userData) => {
    try {
        // Valider les données avant d'interagir avec la base de données
        const validatedData = Utilisateur.omit({ id: true }).parse(userData); // Cela lève une exception si la validation échoue

        return new Promise((resolve, reject) => {
            const { name, email, password, role } = validatedData; // Extraction des données validées

            // Insérer l'utilisateur dans la base de données
            const query = 'INSERT INTO utilisateur (name, email, password, role) VALUES (?, ?, ?, ?)';
            connection.query(query, [name, email, password, role], (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });
    } catch (err) {
        console.error('Validation error:', err);
        // Si la validation échoue, retourner une erreur
        throw new Error('Validation failed: ' + err.errors.map(e => e.message).join(', '));
    }
};

export default Utilisateur;

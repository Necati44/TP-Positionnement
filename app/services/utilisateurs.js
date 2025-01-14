import bcrypt from 'bcrypt';
import { createUtilisateur, getAllUtilisateurs } from '../models/utilisateur.js';

export async function getAllUtilisateursService() {
    return await getAllUtilisateurs();
}

export const signUp = async (name, email, password, role) => {
    // Hashage du mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log("mot de passe hashed: " + hashedPassword);

    // Crée un utilisateur à partir des données validées et du mot de passe haché
    const newUtilisateur = {
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
    };
    
    const utilisateur = await createUtilisateur(newUtilisateur);

    return utilisateur;
}
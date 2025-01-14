import { getAllUtilisateursService, signUp } from '../services/utilisateurs.js'

export const getAllUtilisateursController = async (_, res) => {
    try {
        const utilisateur = await getAllUtilisateursService()
        res.json(utilisateur)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

export const signUpController = async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      // Tu peux faire des validations ici si nécessaire (par exemple, format de l'email)
      
      // Appel du service pour créer un utilisateur
      const user = await signUp(name, email, password, role);
  
      res.status(201).json({ message: 'Utilisateur créé avec succès', user });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error: error.message });
    }
  };
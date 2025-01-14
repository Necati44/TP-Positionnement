import { Router } from 'express';
import { getAllUtilisateursController, signUpController } from '../controllers/utilisateurs.js';

const router = Router();

router.get('/', getAllUtilisateursController) // A conserver pour faire des tests
router.post('/auth/signup', signUpController)
//    router.get('/:id', getProduct)
//    router.post('/', createProduct)

export default router;
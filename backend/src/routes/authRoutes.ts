import { Router } from 'express';
import { registerClient, loginUser } from '../controllers/authController'; // Assuming you'll create authController.ts

const router = Router();

// Rota para registrar um novo cliente
router.post('/register/client', registerClient);

// Rota para login de usuário
router.post('/login', loginUser);

export default router;
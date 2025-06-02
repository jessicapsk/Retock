import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { getUserProfile } from '../controllers/userController';

const router = Router();

// Rota para buscar o perfil do usuário logado
// Esta rota requer que o usuário esteja autenticado (authMiddleware verifica o token)
router.get('/me', authMiddleware, getUserProfile);

export default router;
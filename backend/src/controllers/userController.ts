import { Request, Response } from 'express';
import { User } from '../models/User'; // Ajuste o caminho se o modelo User estiver em outro lugar
import type { JwtPayload } from '../utils/jwt';
import { AppDataSource } from '../config/database';

// Estendendo a interface Request para incluir a propriedade 'user' adicionada pelo authMiddleware
interface AuthenticatedRequest extends Request {
  user?: JwtPayload; // Use JwtPayload diretamente ou defina os tipos compatíveis
}

export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Usuário não autenticado ou ID não encontrado no token.' });
    }

    const userId = req.user.id;
    const userRepository = AppDataSource.getRepository(User); // Obter repositório
    const user = await userRepository.findOne({ // Usar findOne
      where: { id: userId },
      select: ['id', 'name', 'email', 'role', 'isActive'], // Ajuste os atributos conforme o modelo User
      // Removido 'phone', 'cpf', 'cnpj', 'companyName', 'registrationType' se não existirem no modelo User.ts
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Erro ao buscar perfil do usuário.', error: error.message });
    } else {
      res.status(500).json({ message: 'Erro ao buscar perfil do usuário.', error: 'Erro desconhecido' });
    }
  }
};
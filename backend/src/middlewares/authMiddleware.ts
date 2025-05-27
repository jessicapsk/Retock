import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt';

// Estendendo a interface Request do Express para incluir a propriedade 'user'
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token malformado.' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Adiciona o payload do token ao objeto req
    next();
  } catch (error) {
    if (error instanceof Error && error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado.' });
    }
    if (error instanceof Error && error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Token inválido.' });
    }
    return res.status(500).json({ message: 'Falha na autenticação do token.' });
  }
};

// Middleware para verificar papéis específicos
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) { // Alterado de 'papel' para 'role'
      return res.status(403).json({ message: 'Acesso negado. Papel do usuário não definido.' });
    }

    const { role } = req.user; // Alterado de 'papel' para 'role'
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: `Acesso negado. Papel '${role}' não autorizado para este recurso.` });
    }

    next();
  };
};
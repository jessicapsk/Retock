import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export interface JwtPayload {
  id: number;
  role: 'client' | 'professional' | 'admin';
}
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

// Segredos obtidos via variáveis de ambiente
const JWT_SECRET: Secret = process.env.JWT_SECRET as Secret;
const JWT_REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET as Secret;
if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error('JWT_SECRET ou JWT_REFRESH_SECRET não definido nas variáveis de ambiente');
}

// Opções de expiração para tokens
const accessOpts: SignOptions = { expiresIn: (process.env.TOKEN_EXP || '40m') as any };
const refreshOpts: SignOptions = { expiresIn: (process.env.REFRESH_EXP || '7d') as any };

/**
 * Gera um par de tokens (access + refresh) para o payload informado.
 * @param payload - Dados do usuário (id e papel)
 * @returns Par de tokens: { accessToken, refreshToken }
 */
export function issueTokens(payload: JwtPayload): TokenPair {
  const accessToken = jwt.sign(payload, JWT_SECRET, accessOpts as any);
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, refreshOpts as any);
  return { accessToken, refreshToken };
}

/**
 * Verifica o refreshToken e emite novos tokens.
 * @param token - Refresh token a ser verificado
 * @returns Novo par de tokens
 */
export function refreshTokens(token: string): TokenPair {
  const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload;
  // Certifique-se de que o payload passado para issueTokens aqui também use 'role'
  return issueTokens({ id: decoded.id, role: decoded.role });
}
/**
 * Verifica qualquer token JWT e retorna o payload decodificado.
 * @param token - Access token a ser verificado
 * @returns Payload decodificado
 */
export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
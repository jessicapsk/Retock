import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import { DeepPartial } from 'typeorm';
import { issueTokens, TokenPair, JwtPayload } from '../utils/jwt';

// Funções auxiliares para validação
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\d{10,11}$/; // Apenas dígitos, 10 ou 11
  return phoneRegex.test(phone);
}

const isValidPassword = (password: string): { valid: boolean, message?: string } => {
  if (password.length < 8) {
    return { valid: false, message: "A senha deve ter pelo menos 8 caracteres." };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "A senha deve conter pelo menos uma letra maiúscula." };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "A senha deve conter pelo menos uma letra minúscula." };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "A senha deve conter pelo menos um número." };
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return { valid: false, message: "A senha deve conter pelo menos um caractere especial." };
  }
  return { valid: true };
};

export const clientRegistrationService = async (userData: DeepPartial<User>) => {
    const { name, email, password, phone } = userData; // Adicionado phone

    // Validação dos campos de entrada
    if (!name || typeof name !== 'string' || name.trim().length < 3) {
        throw { statusCode: 400, message: 'O nome deve ter pelo menos 3 caracteres.' };
    }
    if (!email || typeof email !== 'string' || !isValidEmail(email.trim())) {
        throw { statusCode: 400, message: 'Email inválido.' };
    }
    // Validação do telefone (se fornecido, pois é opcional no modelo User.ts)
    if (phone) { // O modelo User.ts tem phone como string | null
        if (typeof phone !== 'string' || !isValidPhone(phone.trim())) {
            throw { statusCode: 400, message: 'Número de celular deve conter apenas dígitos e ter 10 ou 11 números.' };
        }
    } else {
        // Se o telefone não for fornecido e for obrigatório pela lógica de negócios, lance um erro aqui.
        // No seu caso, o modelo User permite phone nulo, então não lançamos erro se não vier.
        // Se fosse obrigatório: throw { statusCode: 400, message: 'Número de celular é obrigatório.' };
    }

    if (!password || typeof password !== 'string') {
        throw { statusCode: 400, message: 'Senha é obrigatória.' };
    }
    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.valid) {
        throw { statusCode: 400, message: passwordValidation.message };
    }

    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({ where: { email: email.trim() } });
    if (existingUser) {
        throw { statusCode: 409, message: 'Usuário com este email já existe.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
        name: name.trim(),
        email: email.trim(),
        password: hashedPassword,
        phone: phone ? phone.trim() : null, // Salva o telefone se fornecido
        role: 'client',
        isActive: true,
    });

    await userRepository.save(newUser);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}

// ... loginUserService não modificado ...
export const loginUserService = async (credentials: DeepPartial<User>): Promise<{ tokens: TokenPair, user: Omit<User, 'password'> }> => {
    const { email, password } = credentials;

    if (!email || !password) {
        throw { statusCode: 400, message: 'Email e senha são obrigatórios.' };
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
        throw { statusCode: 401, message: 'Credenciais inválidas.' };
    }

    if (!user.isActive) {
        throw { statusCode: 403, message: 'Usuário inativo. Entre em contato com o suporte.' };
    }

    const isPasswordValid = await bcrypt.compare(password as string, user.password);
    if (!isPasswordValid) {
        throw { statusCode: 401, message: 'Credenciais inválidas.' };
    }

    const jwtPayload: JwtPayload = {
        id: user.id,
        role: user.role as 'client' | 'professional' | 'admin',
    };

    const tokens = issueTokens(jwtPayload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return { tokens, user: userWithoutPassword };
};
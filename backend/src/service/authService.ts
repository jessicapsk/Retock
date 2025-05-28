import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import { DeepPartial } from 'typeorm';
import { issueTokens, TokenPair, JwtPayload } from '../utils/jwt';

export const clientRegistrationService = async (userData: DeepPartial<User>) => {
    const { name, email, password } = userData;

    if (!name || !email || !password) {
        throw { statusCode: 400, message: 'Nome, email e senha são obrigatórios.' };
    }

    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
        throw { statusCode: 409, message: 'Usuário com este email já existe.' };
    }

    const hashedPassword = await bcrypt.hash(password as string, 10);

    const newUser = userRepository.create({
        name,
        email,
        password: hashedPassword,
        role: 'client',
        isActive: true,
    });

    await userRepository.save(newUser);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}
export const loginUserService = async (credentials: DeepPartial<User>): Promise<{ tokens: TokenPair, user: Omit<User, 'password'> }> => {
    const { email, password } = credentials;

    if (!email || !password) {
        throw { statusCode: 400, message: 'Email e senha são obrigatórios.' };
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
        throw { statusCode: 401, message: 'Credenciais inválidas.' }; // Usuário não encontrado
    }

    if (!user.isActive) {
        throw { statusCode: 403, message: 'Usuário inativo. Entre em contato com o suporte.' };
    }

    const isPasswordValid = await bcrypt.compare(password as string, user.password);
    if (!isPasswordValid) {
        throw { statusCode: 401, message: 'Credenciais inválidas.' }; // Senha incorreta
    }

    const jwtPayload: JwtPayload = {
        id: user.id,
        // Garantir que o 'role' do usuário seja um dos tipos esperados em JwtPayload
        role: user.role as 'client' | 'professional' | 'admin',
    };

    const tokens = issueTokens(jwtPayload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return { tokens, user: userWithoutPassword };
};
import { Request, Response } from 'express';
import { clientRegistrationService, loginUserService } from '../service/authService';

export const registerClient = async (req: Request, res: Response) => {
    try {
        const user = await clientRegistrationService(req.body);
        return res.status(201).json({ message: 'Cliente cadastrado com sucesso!', user });
    } catch (error: any) {
        console.error('Erro ao cadastrar cliente:', error);
        // Se o erro tiver um statusCode definido no serviço, use-o
        if (error.statusCode) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno do servidor ao cadastrar cliente.' });
    }
}
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { tokens, user } = await loginUserService(req.body);
        return res.status(200).json({
            message: 'Login bem-sucedido!',
            tokens,
            user
        });
    } catch (error: any) {
        console.error('Erro ao fazer login:', error);
        if (error.statusCode) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno do servidor ao fazer login.' });
    }
};
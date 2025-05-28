// src/services/authService.ts
import api from './api';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  nomeCompleto: string;
  email: string;
  celular: string;
  cpf: string;
  password: string;
}

export const AuthService = {
  async login(data: LoginData) {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async logout() {
    // Implementação de logout se necessário
  },

  async getProfile() {
    const response = await api.get('/auth/me');
    return response.data;
  }
};
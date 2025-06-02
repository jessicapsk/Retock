import api from './api'; 

interface LoginData {
  email: string;
  password: string;
}

interface RegisterClientData {
  name: string;
  email: string;
  password: string;
}

// Estrutura do perfil do usuário (consistente com o backend).
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'client' | 'professional';
  isActive: boolean;
}

// Resposta esperada do endpoint de login.
export interface LoginResponse {
  message: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: UserProfile;
}

// Resposta esperada do endpoint de registro.
export interface RegisterResponse {
  message: string;
  user: UserProfile;
}

export const AuthService = {
  // Realiza o login do usuário.
  async login(data: LoginData): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  // Realiza o registro de um novo cliente.
  async registerClient(data: RegisterClientData): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/auth/register/client', data);
    return response.data;
  },

  // Desloga o usuário.
  async logout() {
    // Remove os tokens e dados do usuário do localStorage.
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = '/login'; 
  },

  // Obtém o perfil do usuário.
  async getProfile(): Promise<UserProfile> {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    throw new Error("GetProfile: Usuário não encontrado no localStorage ou endpoint /auth/me não implementado.");
  },

  // Retorna o accessToken do localStorage.
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  },

  // Retorna o refreshToken do localStorage.
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }
};
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface User {
  id: string;
  nomeCompleto: string;
  email: string;
  role: 'admin' | 'client' | 'professional';
}

export interface AuthResponse {
  token: string;
  user: User;
}
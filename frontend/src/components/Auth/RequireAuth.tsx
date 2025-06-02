import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthService} from '../../services/authService';
import type { UserProfile } from '../../services/authService'; // Ajuste o caminho se necessário
import { UserRole } from '../../types/userTypes'; // Ajuste o caminho se necessário

interface RequireAuthProps {
  allowedRoles: UserRole[];
  children: JSX.Element;
}

const getCurrentUser = (): UserProfile | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr) as UserProfile;
    } catch (e) {
      localStorage.removeItem('user');
      return null;
    }
  }
  return null;
};

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles, children }) => {
  const location = useLocation();
  const currentUser = getCurrentUser();

  if (!isAuthenticated() || !currentUser) {
    // Usuário não logado, redireciona para login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(currentUser.role as UserRole)) {
    switch (currentUser.role) {
      case UserRole.ADMIN:
        return <Navigate to="/dashboard-admin" replace />;
      case UserRole.PROFESSIONAL:
        return <Navigate to="/dashboard-professional" replace />;
      default:
        return <Navigate to="/dashboard-client" replace />;
    }
  }

  return children; // Usuário logado e com perfil permitido
};

export default RequireAuth;
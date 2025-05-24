import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Link
} from '@mui/material';
import InputField from '../components/Layout/customInput';
import { HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi";
import AuthLayout from '../components/Auth/loginContainer';

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    senha: ''
  });
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.usuario || !formData.senha) {
      setError(true);
      return;
    }
    console.log('Login realizado:', formData);
    setFormData({ usuario: '', senha: '' });
    setError(false);
  };

  return (
    <AuthLayout> {/* Substitui o container principal pelo AuthLayout */}
      <Box component="form" onSubmit={handleSubmit} sx={{
        width: '100%',
        maxWidth: 400,
        p: 4,
      }}>
        <Typography sx={{
          fontFamily: 'Playfair Display, serif',
          mb: 4,
          fontSize: '32px',
          textAlign: 'center',
          color: '#3C333F',
          fontWeight: 600
        }}>
          Bem-vindo de volta
        </Typography>

        <InputField
          label="Login"
          placeholder="Digite seu usuário"
          icon={<HiOutlineUser />}    
          value={formData.usuario}
          onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
          error={error && !formData.usuario}
          helperText={error && !formData.usuario ? 'Campo obrigatório' : ''}
          sx={{ mb: 3 }}
        />

        <InputField
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          icon={<HiOutlineLockClosed />}
          value={formData.senha}
          onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
          error={error && !formData.senha}
          helperText={error && !formData.senha ? 'Campo obrigatório' : ''}
          sx={{ mb: 2 }}
        />

        <Box textAlign="right" mb={4}>
          <Link href="#" sx={{
            color: '#996047',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}>
            Esqueceu a senha?
          </Link>
        </Box>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            py: 1.5,
            borderRadius: '30px',
            bgcolor: '#996047',
            '&:hover': { bgcolor: '#7a4c3a' }
          }}
        >
          Entrar
        </Button>

        <Typography sx={{ 
          mt: 4, 
          textAlign: 'center', 
          fontFamily: 'Playfair Display, serif',
          fontSize: '16px', 
          color: 'rgba(60, 51, 63, 1)'
        }}>
          Não possui cadastro? {' '}
          <Link href="#" sx={{
            color: 'rgba(150, 90, 65, 0.95)',
            fontFamily: 'Playfair Display, serif',
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: "27px",
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}>
            Clique aqui
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default LoginScreen;
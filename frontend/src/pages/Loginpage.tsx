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
    <AuthLayout>
      <Box component="form" onSubmit={handleSubmit} sx={{
        width: '100%',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
      }}>
        <Typography sx={{
          fontFamily: 'Playfair Display, serif',
          mb: 3,
          fontSize: { xs: '28px', sm: '32px' },
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
          sx={{ mb: 2 }}
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

        <Box textAlign="right" mb={3}>
          <Link href="#" sx={{
            color: '#996047',
            fontSize: '16px',
            fontFamily: 'Playfair Display, serif',
            fontWeight: 'bold',
            textDecoration: 'underline',
            '&:hover': { textDecoration: 'underline', color: '#7a4c3a' }
          }}>
            Esqueceu a senha?
          </Link>
        </Box>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            width: '150px', // Controla a largura
            height: '45px', // Controla a altura
            alignSelf: 'center', // Centraliza o botão
            borderRadius: '30px',
            fontFamily: 'Playfair Display, serif',
            bgcolor: '#996047',
            '&:hover': { bgcolor: '#7a4c3a' },
            textTransform: 'none', // Remove uppercase automático
            fontSize: '0.9rem', // Controla tamanho da fonte
        }}
        >
        entrar
        </Button>

        <Typography sx={{ 
          mt: 3,
          textAlign: 'center', 
          fontFamily: 'Playfair Display, serif',
          fontSize: '18px',
          color: '#3C333F',
          textShadow: '2px 2px 2px rgba(67, 48, 30, 0.5)',
        }}>
          Não possui cadastro? {' '}
          <Link href="/register" sx={{
            color: '#996047',
            fontSize: '18px',
            fontWeight: 'bold',
            textShadow: '2px 2px 2px rgba(67, 48, 30, 0.5)',
            '&:hover': { textDecoration: 'underline', color: '#7a4c3a' },
            textDecoration: 'underline',
          }}>
            Clique aqui
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default LoginScreen;
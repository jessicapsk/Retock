import React, { useState } from 'react';
import { z } from 'zod';
import {
  Box,
  Typography,
  Button,
  Link
} from '@mui/material';
import InputField from '../components/Layout/customInput';
import { HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi";
import AuthLayout from '../components/Auth/loginContainer';

// Esquema de validação Zod
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(1, 'Campo obrigatório')
});

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await loginSchema.parseAsync(formData);

      setErrors({});
      
      console.log('Login realizado:', formData);
      setFormData({ email: '', senha: '' });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          const path = err.path[0];
          if (path) newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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
          name="email"
          label="Email"
          placeholder="Digite seu email"
          icon={<HiOutlineUser />}
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ mb: 2 }}
        />

        <InputField
          name="senha"
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          icon={<HiOutlineLockClosed />}
          value={formData.senha}
          onChange={handleChange}
          error={!!errors.senha}
          helperText={errors.senha}
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
            width: '150px',
            height: '45px',
            alignSelf: 'center',
            borderRadius: '30px',
            fontFamily: 'Playfair Display, serif',
            bgcolor: '#996047',
            '&:hover': { bgcolor: '#7a4c3a' },
            textTransform: 'none',
            fontSize: '0.9rem',
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
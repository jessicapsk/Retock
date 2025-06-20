import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { z } from 'zod';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/Layout/customInput';
import AuthLayout from '../components/Auth/registerContainer';
import {
  HiOutlineUser,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineIdentification,
  HiOutlineArrowCircleLeft
} from "react-icons/hi";
import { AuthService } from '../services/authService';

// Esquema de validação Zod
const userSchema = z.object({
  nomeCompleto: z.string().min(1, 'Campo obrigatório'),
  email: z.string().email('Email inválido'),
  celular: z.string()
    .min(11, 'Número inválido (DDD + 9 dígitos)')
    .max(11, 'Número inválido (DDD + 9 dígitos)')
    .regex(/^\d+$/, 'Apenas números são permitidos'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmarSenha: z.string()
}).refine(data => data.senha === data.confirmarSenha, {
  message: 'As senhas não coincidem',
  path: ['confirmarSenha']
});

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    celular: '',
    senha: '',
    confirmarSenha: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Função para verificar se o formulário está válido
  const isFormValid = () => {
    return (
      formData.nomeCompleto.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.celular.trim() !== '' &&
      formData.senha.trim() !== '' &&
      formData.confirmarSenha.trim() !== '' &&
      !errors.nomeCompleto &&
      !errors.email &&
      !errors.celular &&
      !errors.senha &&
      !errors.confirmarSenha
    );
  };

  const handleVoltarAoInicio = () => navigate('/');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    switch (name) {
      case 'celular':
        processedValue = value.replace(/\D/g, '').slice(0, 11);
        break;
    }

    setFormData(prev => ({ ...prev, [name]: processedValue }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    
    // Limpar mensagens de erro/sucesso
    if (apiError) setApiError('');
    if (successMessage) setSuccessMessage('');
  };

  const validateForm = async () => {
    try {
      await userSchema.parseAsync(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.errors.reduce((acc, curr) => {
          const path = curr.path[0];
          return path ? { ...acc, [path]: curr.message } : acc;
        }, {});
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    setSuccessMessage('');
    
    if (!(await validateForm())) return;

    try {
      setIsLoading(true);
      
      // Preparar dados para a API (removendo formatação do celular)
      const apiData = {
      name: formData.nomeCompleto, 
      email: formData.email,
      password: formData.senha

      };
      
      const response = await AuthService.registerClient(apiData);   
      setSuccessMessage(response.message ||'Cadastro realizado com sucesso! Redirecionando...');
      
      // Limpar formulário
      setFormData({
        nomeCompleto: '',
        email: '',
        celular: '',
        senha: '',
        confirmarSenha: ''
      });
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      
      // Tratar diferentes tipos de erros
      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else if (error.message) {
        setApiError(error.message);
      } else {
        setApiError('Ocorreu um erro ao realizar o cadastro. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Box component="form" onSubmit={handleSubmit} sx={{
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
      }}>
        <Button
          variant="contained"
          onClick={handleVoltarAoInicio}
          startIcon={<HiOutlineArrowCircleLeft size={20} />}
          sx={{
            width: 'auto',
            height: '45px',
            alignSelf: 'flex-start',
            borderRadius: '30px',
            color: '#3C333F',
            fontFamily: 'Playfair Display, serif',
            bgcolor: '#EAE4D6',
            '&:hover': { bgcolor: '#E0DACE', color: '#3C333F' },
            textTransform: 'none',
            fontSize: '0.8rem',
            mb: 1,
            paddingLeft: '24px',
            paddingRight: '36px',
            marginLeft: -15
          }}
        >
          Voltar ao início
        </Button>

        <Typography sx={{
          fontFamily: 'Playfair Display, serif',
          mb: 3,
          fontSize: { xs: '28px', sm: '32px' },
          textAlign: 'center',
          color: '#3C333F',
          fontWeight: 600
        }}>
          Cadastre-se
        </Typography>

        {/* Mensagens de feedback */}
        {apiError && (
          <Typography sx={{
            color: '#d32f2f',
            textAlign: 'center',
            mb: 2,
            fontFamily: 'Playfair Display, serif',
          }}>
            {apiError}
          </Typography>
        )}
        
        {successMessage && (
          <Typography sx={{
            color: '#2e7d32',
            textAlign: 'center',
            mb: 2,
            fontFamily: 'Playfair Display, serif',
          }}>
            {successMessage}
          </Typography>
        )}

        <InputField
          name="nomeCompleto"
          label="Usuário"
          placeholder="Digite seu nome completo"
          icon={<HiOutlineUser />}
          value={formData.nomeCompleto}
          onChange={handleChange}
          error={!!errors.nomeCompleto}
          helperText={errors.nomeCompleto}
        />

        <InputField
          name="email"
          type="email"
          label="Email"
          placeholder="Digite seu email"
          icon={<HiOutlineMail />}
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />

        <InputField
          name="celular"
          type="tel"
          label="Celular"
          placeholder="Digite seu celular"
          icon={<HiOutlinePhone />}
          value={formData.celular}
          onChange={handleChange}
          error={!!errors.celular}
          helperText={errors.celular}
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
        />

        <InputField
          name="confirmarSenha"
          type="password"
          label="Confirmar Senha"
          placeholder="Confirme sua senha"
          icon={<HiOutlineLockClosed />}
          value={formData.confirmarSenha}
          onChange={handleChange}
          error={!!errors.confirmarSenha}
          helperText={errors.confirmarSenha}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading || !isFormValid()}
          sx={{
            width: '150px',
            height: '45px',
            alignSelf: 'center',
            borderRadius: '30px',
            fontFamily: 'Playfair Display, serif',
            bgcolor: '#996047',
            '&:hover': { 
              bgcolor: !isFormValid() ? '#996047' : '#7a4c3a' 
            },
            '&:disabled': { 
              bgcolor: '#cccccc',
              cursor: 'not-allowed' 
            },
            textTransform: 'none',
            fontSize: '0.9rem',
            mt: 3,
            mb: 3
          }}
        >
          {isLoading ? 'Processando...' : 'Cadastrar'}
        </Button>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
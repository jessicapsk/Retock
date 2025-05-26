import React, { useState } from 'react'; 
import type { ChangeEvent } from 'react';
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
const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    celular: '',
    cpf: '',
    senha: '',
    confirmarSenha: ''
  });
const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleVoltarAoInicio = () => {
    navigate('/'); 
  };
  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;
    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = 'Campo obrigatório';
      isValid = false;
    }
if (!formData.email.trim()) {
      newErrors.email = 'Campo obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }
if (!formData.celular.trim()) {
      newErrors.celular = 'O celular é obrigatório.';
      isValid = false;
    }
    if (!formData.cpf.trim()) {
      newErrors.cpf = 'O CPF é obrigatório.';
      isValid = false;
    }
    // Adicionar validações de formato específico pra celular e CPF 
    if (!formData.senha) {
      newErrors.senha = 'A senha é obrigatória.';
      isValid = false;
    } else if (formData.senha.length < 6) { 
      newErrors.senha = 'Senha deve ter no mínimo 6 caracteres';
      isValid = false;
    }
    if (!formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Campo obrigatório';
      isValid = false;
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
      isValid = false;
    }
 setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Cadastro realizado:', formData);
      // API backend 
      setFormData({
        nomeCompleto: '', email: '', celular: '',
        cpf: '', senha: '', confirmarSenha: ''
      });
      setErrors({});
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
            '&:hover': { bgcolor: '#E0DACE',  color: '#3C333F' },
            textTransform: 'none',
            fontSize: '0.8rem',
            mt: 4,
            mb: 1,
            paddingLeft: '24px',
            paddingRight: '36px',
            marginLeft:-15
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
        
        <InputField
          name="nomeCompleto" label="Usuário" placeholder="Digite seu nome completo"
          icon={<HiOutlineUser />} value={formData.nomeCompleto} onChange={handleChange}
          error={!!errors.nomeCompleto} helperText={errors.nomeCompleto || ''}
        />
        <InputField
          name="email" type="email" label="Email" placeholder="Digite seu email"
          icon={<HiOutlineMail />} value={formData.email} onChange={handleChange}
          error={!!errors.email} helperText={errors.email || ''}
        />
       
        <InputField
          name="celular" type="tel" label="Celular" placeholder="Digite seu celular"
          icon={<HiOutlinePhone />} value={formData.celular} onChange={handleChange}
          error={!!errors.celular} helperText={errors.celular || ''}
        />
       
        <InputField
          name="cpf" label="CPF" placeholder="Digite seu CPF" // type="text" ou deixe o padrão
          icon={<HiOutlineIdentification />} value={formData.cpf} onChange={handleChange}
          error={!!errors.cpf} helperText={errors.cpf || ''}
        />
        <InputField
          name="senha" type="password" label="Senha" placeholder="Digite sua senha"
          icon={<HiOutlineLockClosed />} value={formData.senha} onChange={handleChange}
          error={!!errors.senha} helperText={errors.senha || ''}
        />
        <InputField
          name="confirmarSenha" type="password" label="Confirmar Senha" placeholder="Confirme sua senha"
          icon={<HiOutlineLockClosed />} value={formData.confirmarSenha} onChange={handleChange}
          error={!!errors.confirmarSenha} helperText={errors.confirmarSenha || ''}
        />
        
        <Button
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
            mt: 3,
            mb: 3
          }}
        >
          Enviar
        </Button>
        <Typography sx={{
          mt: 1, 
          textAlign: 'center',
          fontFamily: 'Playfair Display, serif',
          fontSize: '14px',
          color: '#3C333F'
        }}>
        </Typography>
      </Box>
    </AuthLayout>
  );
};
export default RegisterPage;

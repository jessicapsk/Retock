import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Link,
} from '@mui/material';
import InputField from '../Layout/customInput';
import { AccountCircle, Lock } from '@mui/icons-material';

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
  console.log({ usuario: formData.usuario, senha: formData.senha });

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* Lado esquerdo */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: 'rgba(153, 96, 71, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'serif',
            fontWeight: 600,
            color: '#5C2A1D',
            textAlign: 'center',
          }}
        >
          Re<br />Tock
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: 'serif',
            fontStyle: 'italic',
            fontSize: '1.2rem',
            mt: 1,
            color: '#996047',
          }}
        >
          SALÃO DE BELEZA
        </Typography>

        <Typography
          variant="body2"
          sx={{ mt: 4, textAlign: 'center', color: '#996047' }}
        >
          Realce sua beleza com quem entende do assunto!
        </Typography>
      </Box>

      {/* Lado direito */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'white',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '80%',
            maxWidth: '400px',
            px: 4,
            py: 6,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: 4,
              textAlign: 'center',
              color: '#0A2157',
              fontWeight: 600,
            }}
          >
            Bem-vindo de volta
          </Typography>

          <InputField
            label="Login"
            placeholder="Digite seu usuário"
            icon={<AccountCircle />}
            name="usuario"
            value={formData.usuario}
            onChange={(e) =>
              setFormData({ ...formData, usuario: e.target.value })
            }
            error={error && !formData.usuario}
            helperText={error && !formData.usuario ? 'Campo obrigatório' : ''}
          />

          <InputField
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            icon={<Lock />}
            name="senha"
            value={formData.senha}
            onChange={(e) =>
              setFormData({ ...formData, senha: e.target.value })
            }
            error={error && !formData.senha}
            helperText={error && !formData.senha ? 'Campo obrigatório' : ''}
          />

          <Box textAlign="right" mb={4}>
            <Link
              href="#"
              variant="body2"
              sx={{ color: '#996047', textDecoration: 'none' }}
            >
              esqueceu senha?
            </Link>
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{
              py: 1.5,
              borderRadius: '30px',
              bgcolor: '#A9A9A9',
              color: '#fff',
              textTransform: 'none',
              '&:hover': { bgcolor: '#8C8C8C' },
            }}
          >
            entrar
          </Button>

          <Typography variant="body2" sx={{ mt: 4, textAlign: 'center' }}>
            Não possui cadastro?{' '}
            <Link
              href="#"
              sx={{ color: '#996047', fontWeight: 500, textDecoration: 'none' }}
            >
              Clique aqui.
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginScreen;

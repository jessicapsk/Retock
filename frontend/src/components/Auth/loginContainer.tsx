import { Box } from '@mui/material';
import Logo from '../Logo/logo';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        width: '100vw',             // força ocupar toda a largura da tela
        height: '100vh',            // força ocupar toda a altura da tela
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // empilha no mobile
      }}
    >
      {/* Lado Esquerdo - Logo */}
      <Box
        sx={{
          flex: 1, // ocupa metade em layout horizontal
          bgcolor: '#EAE4D6',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
          px: 2,
        }}
      >
        <Logo
          width="400px"
          tagline="Realce sua beleza com quem entende do assunto!"
        />
      </Box>

      {/* Lado Direito - Formulário */}
      <Box
        sx={{
          flex: 1,
          bgcolor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
          px: 2,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;

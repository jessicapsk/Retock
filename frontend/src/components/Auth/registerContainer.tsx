import { Box } from '@mui/material';
import Logo from '../Logo/logo';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh', // Alterado para minHeight
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* Lado Esquerdo - Logo (Ajustado para mobile) */}
      <Box
        sx={{
          flex: { xs: 0.3, md: 1 }, // Reduz altura no mobile
          bgcolor: '#EAE4D6',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: { xs: 2, md: 4 }, 
          px: 2,
        }}
      >
        <Logo
          width= '450px'
          tagline="Realce sua beleza com quem entende do assunto!"
        />
      </Box>

      {/* Lado Direito - Formulário (Ajustes de espaçamento) */}
      <Box
        sx={{
          flex: { xs: 1, md: 1 }, 
          bgcolor: 'white',
          display: 'flex',
          justifyContent: { xs: 'flex-start', md: 'center' }, 
          alignItems: 'flex-start', 
          py: { xs: 2, md: 4 },
          px: 2,
          overflow: 'auto', 
        }}
      >
        <Box sx={{ 
          width: '100%',
          maxWidth: { xs: '100%', sm: '500px' }, // Largura maior
          margin: '0 auto',
          padding: { xs: '10px', sm: '20px' } 
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
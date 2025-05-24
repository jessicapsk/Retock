import { Box } from '@mui/material';
//import Logo from './Logo'; // Seu componente de logo existente

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' }, // Coluna em mobile, linha em desktop
    }}>
      {/* Seção Esquerda - Logo */}
      <Box sx={{
        width: { md: '50%' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
        bgcolor: 'rgba(153, 96, 71, 0.05)' // Fundo claro alaranjado
      }}>
         {/* <Logo /> */}
      </Box>

      {/* Seção Direita - Formulário */}
      <Box sx={{
        width: { md: '100%' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
        bgcolor: 'background.paper' // Fundo branco
      }}>
        <Box sx={{ 
          width: '100%', 
          maxWidth: 400,
          p: 4
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
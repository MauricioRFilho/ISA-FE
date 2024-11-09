import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image'; // Supondo que está usando Next.js para carregar imagens

const Header = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#0033a0', position: 'fixed'}}>
      <Toolbar>
        {/* Logo à esquerda */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <Image src="/img/logo-white.png" alt="Logo" width={120} height={60} /> {/* Altere o caminho conforme necessário */}
        </Box>

        {/* Botão de menu à direita */}
        <IconButton color="inherit" edge="end">
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

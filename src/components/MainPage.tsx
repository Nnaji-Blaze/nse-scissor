import React, { useState } from 'react';
import UrlShortener from './UrlShortener';
import Footer from './Footer';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const MainPage: React.FC = () => {
  const [formType, setFormType] = useState<'login' | 'signup' | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleFormToggle = (type: 'login' | 'signup' | null) => {
    setFormType(type);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeForm = () => {
    setFormType(null);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        padding: 3,
      }}
    >
      <IconButton
        onClick={toggleDrawer}
        sx={{ position: 'absolute', top: 16, left: 16 }}
      >
        {drawerOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button onClick={() => handleFormToggle('login')}>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button onClick={() => handleFormToggle('signup')}>
            <ListItemText primary="Signup" />
          </ListItem>
        </List>
      </Drawer>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Scissor: Your URL Shortening Tool
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Shorten, customize, and track your URLs effortlessly.
        </Typography>
      </Box>
      <UrlShortener />
      {formType === 'login' && <LoginForm onClose={closeForm} />}
      {formType === 'signup' && <SignUpForm onClose={closeForm} />}
      <Box sx={{ mt: 'auto', width: '100%' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default MainPage;

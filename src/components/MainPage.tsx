import React, { useState } from 'react';
import UrlShortener from './UrlShortener';
import Signup from './Signup';
import Login from './Login';
import Footer from './Footer';
import { Box, Button, Typography } from '@mui/material';
import './MainPage.css';

const MainPage: React.FC = () => {
  const [formType, setFormType] = useState<'login' | 'signup' | null>(null);

  const handleFormToggle = (type: 'login' | 'signup' | null) => {
    setFormType(type);
  };

  return (
    <Box className="main-page-container">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        padding={2}
      >
        <Typography variant="h4">Scissor URL Shortener</Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleFormToggle('login')}
            style={{ marginRight: '8px' }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleFormToggle('signup')}
          >
            Signup
          </Button>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={`urlshortener-container ${formType ? 'form-active' : ''}`}
      >
        <UrlShortener />
        {formType === 'login' && <Login />}
        {formType === 'signup' && <Signup />}
      </Box>
      <Footer />
    </Box>
  );
};

export default MainPage;

import React, { useState } from 'react';
import './App.css';
import UrlShortener from './components/UrlShortener';
import Signup from './components/Signup';
import Login from './components/Login';
import { Drawer, List, ListItem, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeForm, setActiveForm] = useState('');

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    if (drawerOpen) {
      setActiveForm('');
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={`App ${drawerOpen ? 'drawer-open' : ''}`}>
      <div className="main-page-container">
        <div className="header">
          <IconButton onClick={toggleDrawer} className="menu-button">
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h4" className="app-name" onClick={handleRefresh}>
            Scissor
          </Typography>
          <IconButton onClick={handleRefresh} className="refresh-button">
            <RefreshIcon />
          </IconButton>
        </div>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <List>
            <ListItem button onClick={() => setActiveForm('signup')}>
              Signup
            </ListItem>
            <ListItem button onClick={() => setActiveForm('login')}>
              Login
            </ListItem>
          </List>
        </Drawer>
        <div className={`content-container ${activeForm ? 'active' : ''}`}>
          {activeForm === 'signup' && <Signup />}
          {activeForm === 'login' && <Login />}
          <UrlShortener />
        </div>
      </div>
    </div>
  );
}

export default App;

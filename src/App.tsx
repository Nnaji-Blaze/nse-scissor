import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Scissor</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Router>
      </Container>
    </React.Fragment>
  );
};

export default App;

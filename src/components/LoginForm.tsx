import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetPassword, setResetPassword] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" mb={2}>
        Login
      </Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
        sx={{ mt: 2 }}
      >
        Login
      </Button>
      <Button
        variant="text"
        color="secondary"
        onClick={() => setResetPassword(!resetPassword)}
        fullWidth
        sx={{ mt: 1 }}
      >
        Forgot Password?
      </Button>
      {resetPassword && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handlePasswordReset}
          fullWidth
          sx={{ mt: 2 }}
        >
          Reset Password
        </Button>
      )}
      <Button variant="text" onClick={onClose} fullWidth sx={{ mt: 2 }}>
        Close
      </Button>
    </Box>
  );
};

export default LoginForm;

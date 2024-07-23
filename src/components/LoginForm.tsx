import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust import as needed

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
    <Box>
      <Typography variant="h6">Login</Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Button
        variant="text"
        color="primary"
        onClick={() => setResetPassword(!resetPassword)}
      >
        Forgot Password?
      </Button>
      {resetPassword && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handlePasswordReset}
        >
          Reset Password
        </Button>
      )}
      <Button variant="text" onClick={onClose}>
        Close
      </Button>
    </Box>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

interface SignUpFormProps {
  onClose: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (error) {
      console.error('Error signing up:', error);
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
        Sign Up
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
        onClick={handleSignUp}
        fullWidth
        sx={{ mt: 2 }}
      >
        Sign Up
      </Button>
      <Button variant="text" onClick={onClose} fullWidth sx={{ mt: 2 }}>
        Close
      </Button>
    </Box>
  );
};

export default SignUpForm;

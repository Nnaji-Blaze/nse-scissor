import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { auth } from '../firebaseConfig';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signup successful!');
    } catch (error: unknown) {
      setError((error as { message: string }).message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4">Signup</Typography>
        <TextField
          label="Email"
          type="email"
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignup}
          fullWidth
        >
          Signup
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default Signup;

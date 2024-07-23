import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust import as needed

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');

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
      <Typography variant="h6">Forgot Password</Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handlePasswordReset}
      >
        Reset Password
      </Button>
    </Box>
  );
};

export default ForgotPasswordForm;

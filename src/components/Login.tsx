import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Box, TextField, Button, Typography } from '@mui/material';
import { auth } from '../firebaseConfig';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import './Login.css';

const Login: React.FC = () => {
  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      alert('Login successful');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  const handlePasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent');
    } catch (error) {
      console.error('Password reset error:', error);
      alert('Failed to send password reset email');
    }
  };

  return (
    <Box
      className="form-container"
      sx={{ maxWidth: '400px', margin: 'auto', padding: 3 }}
    >
      <Typography variant="h6" gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Required'),
        })}
        onSubmit={handleLogin}
      >
        {({ errors, touched, values }) => (
          <Form>
            <Box mb={2}>
              <Field
                as={TextField}
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>
            <Box mb={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </Box>
            <Box mb={2}>
              <Button
                type="button"
                variant="text"
                color="secondary"
                onClick={() => handlePasswordReset(values.email)}
                fullWidth
              >
                Forgot Password?
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;

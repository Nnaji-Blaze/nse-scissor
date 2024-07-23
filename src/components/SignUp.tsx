import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Box, TextField, Button, Typography } from '@mui/material';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './Signup.css';

const Signup: React.FC = () => {
  const handleSignup = async (values: { email: string; password: string }) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      alert('Signup successful');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed');
    }
  };

  return (
    <Box className="form-container">
      <Typography variant="h6">Signup</Typography>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Required'),
        })}
        onSubmit={handleSignup}
      >
        {({ errors, touched }) => (
          <Form>
            <Box mb={2}>
              <Field
                as={TextField}
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                error={touched.email && Boolean(errors.email)}
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
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Signup
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Signup;

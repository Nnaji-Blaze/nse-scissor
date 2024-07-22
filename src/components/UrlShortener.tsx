import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { analytics, logEvent, auth, db } from '../firebaseConfig';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const UrlShortener: React.FC = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [urls, setUrls] = useState<any[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        fetchUserUrls(user.uid);
      }
    });
  }, []);

  const handleShortenUrl = async (values: {
    longUrl: string;
    customUrl: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'https://nse-scissor.onrender.com/api/shorten',
        {
          longUrl: values.longUrl,
          customUrl: values.customUrl,
        },
      );
      const { shortUrl } = response.data;
      setShortUrl(shortUrl);
      if (user) {
        await addDoc(collection(db, 'urls'), {
          uid: user.uid,
          longUrl: values.longUrl,
          customUrl: values.customUrl,
          shortUrl,
        });
        fetchUserUrls(user.uid);
      }
    } catch (error) {
      setError('Failed to shorten URL. Please try again.');
      console.error('Error shortening URL:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserUrls = async (uid: string) => {
    const q = query(collection(db, 'urls'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    const urls = querySnapshot.docs.map((doc) => doc.data());
    setUrls(urls);
  };

  const trackClick = () => {
    if (shortUrl) {
      logEvent(analytics, 'url_click', { shortUrl });
    }
  };

  return (
    <Container>
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Formik
          initialValues={{ longUrl: '', customUrl: '' }}
          validationSchema={Yup.object({
            longUrl: Yup.string().url('Invalid URL').required('Required'),
            customUrl: Yup.string().required('Required'),
          })}
          onSubmit={handleShortenUrl}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={2}>
                <TextField
                  name="longUrl"
                  type="text"
                  label="Enter long URL"
                  value={values.longUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.longUrl && Boolean(errors.longUrl)}
                  helperText={touched.longUrl && errors.longUrl}
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <TextField
                  name="customUrl"
                  type="text"
                  label="Enter custom URL"
                  value={values.customUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.customUrl && Boolean(errors.customUrl)}
                  helperText={touched.customUrl && errors.customUrl}
                  fullWidth
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
              >
                {loading ? <CircularProgress size={24} /> : 'Shorten URL'}
              </Button>
            </form>
          )}
        </Formik>
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
        {shortUrl && (
          <Box mt={4} textAlign="center">
            <Typography variant="h6" onClick={trackClick}>
              Short URL: {shortUrl}
            </Typography>
            <QRCode value={shortUrl} />
          </Box>
        )}
        {user && (
          <Box mt={4}>
            <Typography variant="h5">Your URLs</Typography>
            <List>
              {urls.map((url, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={url.shortUrl}
                    secondary={url.longUrl}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default UrlShortener;

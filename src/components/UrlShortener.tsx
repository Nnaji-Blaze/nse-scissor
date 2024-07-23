import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { analytics, firebaseLogEvent as logEvent, db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import './UrlShortener.css';

interface UrlData {
  id: string;
  longUrl: string;
  shortUrl: string;
}

const UrlShortener: React.FC = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [urlData, setUrlData] = useState<UrlData[]>([]);

  useEffect(() => {
    const fetchUrlData = async () => {
      const querySnapshot = await getDocs(collection(db, 'urls'));
      const data: UrlData[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as UrlData);
      });
      setUrlData(data);
    };
    fetchUrlData();
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
      setShortUrl(response.data.shortUrl);
      logEvent(analytics, 'shorten_url', { shortUrl: response.data.shortUrl });
    } catch (error) {
      setError('Failed to shorten URL. Please try again.');
      console.error('Error shortening URL:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="urlshortener-container">
      <Formik
        initialValues={{ longUrl: '', customUrl: '' }}
        validationSchema={Yup.object({
          longUrl: Yup.string().url('Invalid URL').required('Required'),
          customUrl: Yup.string().required('Required'),
        })}
        onSubmit={handleShortenUrl}
      >
        {({ errors, touched }) => (
          <Form>
            <Box mb={2}>
              <Field
                as={TextField}
                name="longUrl"
                type="text"
                label="Enter long URL"
                variant="outlined"
                fullWidth
                error={touched.longUrl && Boolean(errors.longUrl)}
                helperText={touched.longUrl && errors.longUrl}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                name="customUrl"
                type="text"
                label="Enter custom URL"
                variant="outlined"
                fullWidth
                error={touched.customUrl && Boolean(errors.customUrl)}
                helperText={touched.customUrl && errors.customUrl}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Shortening...' : 'Shorten URL'}
            </Button>
          </Form>
        )}
      </Formik>
      {error && <Typography color="error">{error}</Typography>}
      {shortUrl && (
        <Box mt={2}>
          <Typography>Short URL: {shortUrl}</Typography>
          <QRCode value={shortUrl} />
        </Box>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Long URL</TableCell>
              <TableCell>Short URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urlData.map((url) => (
              <TableRow key={url.id}>
                <TableCell>{url.longUrl}</TableCell>
                <TableCell>{url.shortUrl}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UrlShortener;

import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { analytics, logEvent } from '../firebaseConfig';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UrlShortener: React.FC = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleShortenUrl = async (values: {
    longUrl: string;
    customUrl: string;
  }) => {
    setLoading(true);
    setError(null); // Reset previous error state
    try {
      const response = await axios.post(
        'https://nse-scissor.onrender.com/api/shorten',
        {
          longUrl: values.longUrl,
          customUrl: values.customUrl,
        },
      );
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      setError('Failed to shorten URL. Please try again.');
      console.error('Error shortening URL:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackClick = () => {
    if (shortUrl) {
      logEvent(analytics, 'url_click', { shortUrl });
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ longUrl: '', customUrl: '' }}
        validationSchema={Yup.object({
          longUrl: Yup.string().url('Invalid URL').required('Required'),
          customUrl: Yup.string().required('Required'),
        })}
        onSubmit={handleShortenUrl}
      >
        <Form>
          <div>
            <Field name="longUrl" type="text" placeholder="Enter long URL" />
            <ErrorMessage name="longUrl" component="div" />
          </div>
          <div>
            <Field
              name="customUrl"
              type="text"
              placeholder="Enter custom URL"
            />
            <ErrorMessage name="customUrl" component="div" />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </Form>
      </Formik>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {shortUrl && (
        <div>
          <p onClick={trackClick}>Short URL: {shortUrl}</p>
          <QRCode value={shortUrl} />
        </div>
      )}
    </div>
  );
};

export default UrlShortener;

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createShortenedUrl } from '../services/urlService';
import { auth } from '../firebaseConfig';

const UrlShortener: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const handleShorten = async () => {
    if (!originalUrl) return;
    const userId = auth.currentUser?.uid || 'anonymous';
    const urlId = await createShortenedUrl(originalUrl, userId);
    setShortenedUrl(`https://scissor.com/${urlId}`);
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: 'auto',
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" mb={2}>
        Shorten Your URL
      </Typography>
      <TextField
        label="Enter URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleShorten}
        fullWidth
        sx={{ mt: 2 }}
      >
        Shorten URL
      </Button>
      {shortenedUrl && (
        <Box mt={2}>
          <Typography variant="body1">Shortened URL:</Typography>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </Box>
      )}
    </Box>
  );
};

export default UrlShortener;

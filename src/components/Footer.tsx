import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box mt={4}>
      <Typography variant="body2" color="textSecondary" align="center">
        &copy; 2024 Nnaji Blaze
      </Typography>
    </Box>
  );
};

export default Footer;

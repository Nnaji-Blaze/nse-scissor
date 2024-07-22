// src/components/UrlShortener.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UrlShortener from '../components/UrlShortener';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('shows shortened URL after shortening', async () => {
  mockedAxios.post.mockResolvedValue({
    data: { shortUrl: 'http://short.url/test' },
  });

  render(<UrlShortener />);

  await waitFor(() => {
    expect(screen.getByText('http://short.url/test')).toBeInTheDocument();
  });
});

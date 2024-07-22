const express = require('express');
const cors = require('cors');
const shortid = require('shortid');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const urlDatabase = {};

// Endpoint to shorten URL
app.post('/api/shorten', (req, res) => {
  const { longUrl, customUrl } = req.body;
  const shortUrl = customUrl || shortid.generate();
  urlDatabase[shortUrl] = longUrl;
  res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortUrl}` });
});

// Endpoint to handle redirection
app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;
  const longUrl = urlDatabase[shortUrl];

  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

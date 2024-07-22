const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

let urlDatabase = {};

app.post('/api/shorten', (req, res) => {
  const { longUrl, customUrl } = req.body;
  const shortId = customUrl || shortid.generate();
  const shortUrl = `${req.protocol}://${req.get('host')}/${shortId}`;

  urlDatabase[shortId] = longUrl;

  res.json({ shortUrl });
});

app.get('/:shortId', (req, res) => {
  const longUrl = urlDatabase[req.params.shortId];
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.get('/', (req, res) => {
  res.send('URL Shortener API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

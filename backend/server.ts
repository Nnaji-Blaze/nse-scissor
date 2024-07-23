import express from 'express';
import bodyParser from 'body-parser';
import shortid from 'shortid';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

interface UrlDatabase {
  [key: string]: string;
}

const urlDatabase: UrlDatabase = {};
const baseUrl = process.env.BASE_URL || 'http://localhost:5000'; // Default to localhost for local development

app.post('/api/shorten', (req, res) => {
  const { longUrl, customUrl } = req.body;
  const shortId = customUrl || shortid.generate();
  const shortUrl = `${baseUrl}/${shortId}`;

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

app.get('/api/urls', (req, res) => {
  const urlsArray = Object.keys(urlDatabase).map((key) => ({
    shortUrl: `${baseUrl}/${key}`,
    longUrl: urlDatabase[key],
  }));
  res.json({ urls: urlsArray });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

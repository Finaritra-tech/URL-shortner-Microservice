require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.use(express.urlencoded({ extended: true }));

app.post('/api/shorturl', (req, res) => {
  let urls = []
  const url = req.body.url
  const shortId = urls.length + 1;
  urls.push({ original_url: url, short_url: shortId });

  res.json({original_url : url, short_url : shortId })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

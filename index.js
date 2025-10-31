require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');



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

var urls = []
app.post('/api/shorturl', (req, res) => {
  const url = req.body.url
  
  try {
     const parsedUrl = new URL(url);

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return res.json({ error: "invalid url" });
    }
    dns.lookup(hostname, (err) => {
      if (err) {
        return res.status(404).json({error : "invalid url"});
      }
      const shortId = urls.length + 1;
      urls.push({ original_url: url, short_url: shortId });
      res.json({original_url : url, short_url : shortId })
    });
  } catch (e) {
    res.status(400).json({error : "invalid url"});
  }
  
})
app.get('/api/shorturl/:shortId', (req, res) =>{
  const short = parseInt(req.params.shortId);
  const original = urls.find(p => p.short_url === short);

  if(original){
    res.redirect(original.original_url);
  }else{
    res.status(404).json({ error: 'invalid url' });
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

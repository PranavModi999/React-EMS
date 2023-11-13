const express = require('express');

const app = express();

require('dotenv').config();

app.use(express.static('public'));

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || 'http://localhost:3000/graphql';
const env = { UI_API_ENDPOINT };
app.get('/env.js', (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});
const PORT = process.env.UI_SERVER_PORT || 8000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`UI started on port ${PORT}...`);
});

const express = require('express');
const app = express();
app.get('/api', (req, res) => {
  res.send('Hello World ServerUNO!')
})

app.get('/', (req, res) => {
  res.send('ServerUNO!')
})

app.listen(6000, () => console.log('Server is up and running'));
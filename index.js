const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Ok. I\'m listening at 3000.');
});

app.listen(3000);

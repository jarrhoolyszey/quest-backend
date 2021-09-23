require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./controllers/auth')(app);
require('./controllers/question')(app);

app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(3000, () => {
  console.log('Server is running at *:3000');
});
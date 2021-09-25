require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('src/pages'));

require('./controllers/admin')(app);
require('./controllers/auth')(app);
require('./controllers/question')(app);

app.listen(port, () => {
  console.log(`Server is running at *:${port}`);
});
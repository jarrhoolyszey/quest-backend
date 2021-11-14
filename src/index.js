require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

let whitelist = [
  'http://localhost:50000',
  'http://localhost:3000',
  'https://ies300-quest-backend.herokuapp.com',
  'https://quest-f533f.web.app/',
  'https://quest-f533f.firebaseapp.com/'
];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    if(!origin) return callback(null, true);
    if(whitelist.indexOf(origin) === -1){
      var message = 'The CORS policy for this origin doesn\'t allow access from the particular origin.';
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('src/pages'));

require('./controllers/admin')(app);
require('./controllers/auth')(app);
require('./controllers/question')(app);
require('./controllers/user')(app);

app.get('/', (req, res) => {
  return res.redirect('/login');
})

app.listen(port, () => {
  console.log(`Server is running at *:${port}`);
});
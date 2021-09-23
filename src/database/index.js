const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
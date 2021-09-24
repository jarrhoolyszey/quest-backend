const express = require('express');

const User = require('../models/user');

const router = express.Router();

// List all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();

    return res.send( users );

  } catch (err) {
    console.log( err.message );
    return res.status(400).send( 'Failed on loading users.' );
  }
});

module.exports = app => app.use('/users', router);
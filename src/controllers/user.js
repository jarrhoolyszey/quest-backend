const express = require('express');

const User = require('../models/user');

const router = express.Router();


router.get('/', (req, res) => {
  res.send('OK from user controller');
});

router.get('/:userId', (req, res) => {
  res.send('OK from user controller');
});

router.post('/:userId', (req, res) => {
  res.send('OK from user controller');
});

router.put('/:userId', (req, res) => {
  res.send('OK from user controller');
});

router.delete('/:userId', (req, res) => {
  res.send('OK from user controller');
});

module.exports = app => app.use('/users', router);
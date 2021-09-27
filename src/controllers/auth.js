const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');
const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}) {

  return jwt.sign({ ...params }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
}

// Create a new User an Log in
router.post('/register', async (req, res) => {
  const { email } = req.body;
  
  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: 'User already exists.' });

    const user = await User.create(req.body);
    
    user.password = undefined;

    return res.send({ 
      user,
      token: generateToken({ id: user._id }), 
    });
  } catch (err) {
    console.log( err.message );
    return res.status(400).send({ error: 'Registration failed' });
  }
});

// Log in as User - CONSTRUCT
router.post('/user', async (req, res) => {
  const { nickname, password } = req.body;

  const user = await User.findOne({ nickname }).select('+password');

  if (!user)
    return res.status(400).send( 'Usuário não encontrado.' );

  if (!await bcrypt.compare(password, user.password))
    return res.status(400).send( 'Senha inválida.' );
  
  user.password = undefined;

  res.send({ 
    user,
    token: generateToken({ id: user._id }),
  });
});

// Log in as Admin
router.post('/admin', async (req, res) => {
  const { nickname, password } = req.body;

  const admin = await Admin.findOne({ nickname }).select('+password');

  if (!admin)
    return res.status(400).send({ error: 'Admin not found.' });

  if (!await bcrypt.compare(password, admin.password))
    return res.status(400).send({ error: 'Invalid password.' });
  
  admin.password = undefined;

  res.send({ 
    admin,
    token: generateToken({
      id: admin._id,
      isAdmin: true, 
    }),
  });
});

module.exports = app => app.use('/auth', router);
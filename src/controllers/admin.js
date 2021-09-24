const express = require('express');

const Admin = require('../models/admin');

const router = express.Router();

// List admins accounts
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();

    return res.send( admins );

  } catch (err) {
    console.log(err.message);
    return res.send( 'Failed loading admins.' );
  }
});

// Find an admin account by id
router.get('/:adminId', async (req, res) => {
  const { adminId } = req.params;

  try {
    const admin = await Admin.findById(adminId);

    return res.send( admin );
  } catch (err) {
    console.log(err);
    return res.status(400).send( 'Failed on get admin account' );
  }
});

// Create a new admin account
router.post('/register', async (req, res) => {
  const { nickname } = req.body;

  try {
    if (await Admin.findOne({ nickname }))
      return res.status(400).send( 'Admin already exists.' );

    const admin = await Admin.create(req.body);

    admin.password = undefined;

    return res.send( admin );
    
  } catch (err) {
    console.log(err.message);
    return res.status(400).send( 'Admin register failed.' );
  }
});

// Update an admin account
router.put('/:adminId', async (req, res) => {
  const { adminId } = req.params;

  try {
    const admin = await Admin.findByIdAndUpdate(adminId, req.body);

    return res.send(admin);
    
  } catch (err) {
    console.log(err.message);
    return res.status(400).send( 'Failed on updating admin account' );
  }
});

// Delete an admin account by id
router.delete('/:adminId', async (req, res) => {
  const { adminId } = req.params;

  try {
    const admin = await Admin.findByIdAndDelete(adminId);
    
    return res.send(admin);

  } catch (err) {
    console.log(err.message);
    return res.status(400).send( 'Failed on admin account delete.' );
  }
});


module.exports = app => app.use('/admin', router);
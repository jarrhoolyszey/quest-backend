const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

AdminSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;

  next();
})

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
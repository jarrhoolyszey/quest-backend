const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const defAvatars = [
  "squirtle.png",
  "bubassauro.png",
  "roxo.png",
  "pikachu.png",
];

const defPins = [
  "pin_azul.png",
  "pin_verde.png",
  "pin_roxo.png",
  "pin_amarelo.png",
]

const UserSchema = new mongoose.Schema({
  nickname: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    lowercase: true,
  },
  avatar: {
    current: {
      type: String,
      default: defAvatars[Math.floor(Math.random() * defAvatars.length)],
    },
    options: {
      type: [String],
      default: defAvatars,
    }
  },
  pin: {
    current: {
      type: String,
      default: defPins[Math.floor(Math.random() * defPins.length)],
    },
    options: {
      type: [String],
      default: defPins,
    }
  },
  decks: {
    current: {
      type: String,
      default: "default",
    },
    options: {
      type: [String],
      default: ["default"],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;

  next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
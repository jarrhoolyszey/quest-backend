const mongoose = require('../database');

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  correct: {
    type: String,
    required: true,
  },
  wrong_1: {
    type: String,
    required: true,
  },
  wrong_2: {
    type: String,
    required: true,
  },
  wrong_3: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
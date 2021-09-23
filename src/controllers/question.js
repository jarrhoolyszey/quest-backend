const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Question = require('../models/question');

const router = express.Router();

//router.use(authMiddleware);

// List all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();

    return res.send({ questions });
  } catch (err) {
    return res.status(400).send({ error: 'Error on loading questions. '});
  }
});

// Register a new question
router.post('/', async (req, res) => {
  try {
    const questions = await Question.create( req.body );
    
    return res.send({ questions });
  } catch (err) {
    return res.status(400).send({ error: 'Error creating a new question.' });
  }
});

// Find a question
router.get('/:questionId', async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);
  
    return res.send({ question });
  } catch (err) {
    res.status(400).send({ error: 'Error loading question.' });
  }
});

// Update a question
router.put('/:questionId', (req, res) => {
  res.send('OK 2');
});

// Delete a question
router.delete('/:questionId', async (req, res) => {
  try {
    const question = await Question.findByIdAndRemove(req.params.questionId);
  
    return res.send({ question });
  } catch (err) {
    res.status(400).send({ error: 'Error loading question.' });
  }
});

module.exports = app => app.use('/questions', router);
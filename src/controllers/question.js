const express = require('express');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');

const Question = require('../models/question');

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

// List all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();

    return res.send( questions );
  } catch (err) {
    return res.status(400).send( 'Error on loading questions. ' );
  }
});

// Find a question
router.get('/:questionId', async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);
  
    return res.send( question );
  } catch (err) {
    res.status(400).send( 'Error loading question.' );
  }
});

// Create a new question
router.post('/', async (req, res) => {
  try {
    const question = await Question.create( req.body );
    
    return res.send( question );
  } catch (err) {
    return res.status(400).send( 'Error creating a new question.' );
  }
});

// Update a question
router.put('/:questionId', async (req, res) => {
  const { questionId } = req.params;

  try {
    const question = await Question.findByIdAndUpdate(questionId, req.body);

    return res.send( question );
    
  } catch (err) {
    console.log(err.message);
    return res.status(400).send( 'Failed on updating question.' );
  }
});

// Delete a question
router.delete('/:questionId', async (req, res) => {
  try {
    const question = await Question.findByIdAndRemove(req.params.questionId);
  
    return res.send( question );
  } catch (err) {
    res.status(400).send( 'Error loading question.' );
  }
});

module.exports = app => app.use('/questions', router);
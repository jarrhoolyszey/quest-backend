const express = require('express');

const User = require('../models/user');
const Question = require('../models/question');

const router = express.Router();

// List all users
router.get('/list', async (req, res) => {
  try {
    const users = await User.find();

    return res.send( users );

  } catch (err) {
    console.log( err.message );
    return res.status(400).send( 'Failed on loading users.' );
  }
});

router.post('/', async (req, res) => {
  try {
    const { nickname, password } = req.body;

    const user = await User.create({
      nickname,
      password,
    });

    if(user) {
      return res.send('Usuário criado com sucesso!');
    }

  } catch (err) {
    console.log(err.message);
    return res.status(400).send( 'Falha no cadastro de usuário' );
  }
})

// // Get Question by Category for Players (Users)
// router.get('/', async (req, res) => {
//   const { category } = req.query;
  
//   try {
//     let questions = [];
    
//     if (category !== 'Random') {
//       questions = await Question.find({
//         category: { $regex: category }
//       });
//     } else {
//       questions = await Question.find();
//     }

//     if (questions) {
//       const question = questions[Math.floor(Math.random() * questions.length)];

//       return res.status(200).send(question);
//     }

//   } catch (err) {
//     console.log(err);
//     return res.status(400).send( 'Error on getting question.' );
//   }
// })

// Get Question by Category for Players (Users) with blocklist ids
router.post('/get-question', async (req, res) => {
  const { category, blacklist } = req.body;
  const N = 10; // quantidade de perguntas para filtrar

  try {
    let questions = [];
    
    if (category !== 'Random') {
      questions = await Question.aggregate([
        { $match: { category: { $regex: category }, _id: { $nin: blacklist } } },
        { $sample: { size: N } }
      ]);
    } else {
      questions = await Question.aggregate([
        { $match: { _id: { $nin: blacklist } } },
        { $sample: { size: N } }
      ]);
    }

    if(questions) {
      let index = Math.floor(Math.random() * N);

      return res.send(questions[index]);
    }

  } catch (err) {
    console.log(err);
    return res.status(400).send( 'Error on getting question.' );
  }
})

module.exports = app => app.use('/users', router);
const express = require('express');
const ObjectId = require('mongoose').Types.ObjectId;

const Auth = require('../middlewares/auth');

const User = require('../models/user');
const Question = require('../models/question');

const router = express.Router();


// Update User adding some Avatar to him
router.post('/update', Auth, async (req, res) => {
  const { avatar } = req.query;
  const { id, nickname } = req;
  console.log(id, nickname);

  try {
    let user = await User.findOne(
      { _id: id, nickname }
    );

    // add desired avatar url to use avatar options
    user.avatar.options.push(avatar);
    
    const _user = await User.findOneAndUpdate({ _id: id, nickname}, user, { new: true });

    if(_user)
      return res.send(_user);


  } catch (err) {
    console.log(err.message);
    return res.status(400).send( 'Failed on update user.' );
  }
});

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

// Get Question by Category for Players (Users) with blocklist ids
router.post('/get-question', async (req, res) => {
  //console.log("requisição body: ", req.body);
  // Hack for Construct 2 POST request compatibility
  const data = JSON.parse(Object.keys(req.body)[0]);
  
  const { category, blacklist } = data;
  const N = 10; // quantidade de perguntas para filtrar

  // Converte as strings do blacklist para ObjectId para fazer a query $nin
  let _ids = [];
  for(let i=0; i<blacklist.length; i++) {
    _ids[i] = new ObjectId(blacklist[i]);
  }


  try {
    let questions = [];
    
    if (category !== 'Random') {
      questions = await Question.aggregate([
        { $match: { category: { $regex: category }, _id: { $nin: _ids } } },
        { $sample: { size: N } }
      ]);
    } else {
      questions = await Question.aggregate([
        { $match: { _id: { $nin: _ids } } },
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
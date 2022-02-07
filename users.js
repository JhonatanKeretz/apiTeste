var express = require('express');
var router = express.Router();
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_TOKEN;


router.post('/register', async(req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  try { 
    await user.save();
    res.status(200).json(user);
  }catch(error) {
    res.status(500).json({ error: 'Erro ao registrar novo usuário'});
   
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if(!user) {
      return res.status(401).json({error: 'Senha ou email incorretos!'});
    }
    
    const comparePasswords = user.isCorrectPassword(password)
    
    if (!comparePasswords) {
      return res.status(401).json({ error: 'Senha ou email incorretos!'})
    }

    const token = jwt.sign({email}, secret, { expiresIn: '10d' });
    return res.json({ user, token }) 
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Erro interno, por favor tente novamente'})
   
  }
})


module.exports = router;
const bcrypt= require('bcryptjs');
const express= require('express');
const router= express.Router();
const users= require('../users/user-model');
const restricted= require('./restricted-middleware');

router.post('/register', (req, res) => {
  const userInfo= req.body;
  console.log("userInfo:". userInfo);
  const rounds= process.env.HASHING_ROUNDS || 8;
  const hash= bcrypt.hashSync(userInfo.password, rounds);

  userInfo.password= hash;

  users.add(userInfo)
  .then( user => {
    res.status(201).json({message: `User: ${user} Successfully created`});
  } )
  .catch(error => {
    res.status(200).json({error: "Could not create user"});
  })
});

router.post('/login', (req, res) => {
  const {username, password}= req.body;
  users.findBy({username})
  .then( ([user]) => {
    if( user && bcrypt.compareSync(password, user.password) ){
      req.session.user= {
        id: user.id,
        username: user.username
      };
      res.status(200).json({Hello: user.username})
    }else{
      res.status(401).json({Error: "invalid credentials"})
    }//end if
  } )
  .catch(error => {
    res.status(500).json({Error: "Could not process your request"});
  })
});


module.exports= router;
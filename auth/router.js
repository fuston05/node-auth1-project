require('dotenv').config();
const bcrypt= require('bcryptjs');
const express= require('express');
const router= express.Router();
const users= require('../users/user-model');

router.post('/register', (req, res) => {

  const userInfo= req.body;
  //rounds must be an integer
  const rounds= parseInt(process.env.HASHING_ROUNDS) || 
  parseInt(10);
  const hash= bcrypt.hashSync(userInfo.password, rounds);

  userInfo.password= hash;

  users.add(userInfo)
  .then( user => {
    res.status(201).json({message: `User: Successfully created`});
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

router.get('/logout', (req, res) => {
  if(req.session){
    req.session.destroy(error => {
      if(error){
        res.status(500).json({error: "could not log you out for some reason"})
      }else{ //if no destroy error
        res.status(200).json({message: "logged out successfully"});
      }//end if/else
    })
  }else{ //if no session
    res.status(200).json({message: "you are not logged in"});
  }
});


module.exports= router;
const express= require('express');

const router= express.Router();

const users= require('./user-model');

router.get('/', (req, res) => {
  users.find()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    res.status(500).json({error: "Could not process your request"})
  });
});


module.exports= router;
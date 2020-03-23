const express= require('express');
const server= express();
const cors= require('cors');
const helmet= require('helmet');

//define routers
const usersRouter= require('../users/usersRouter');
// const authRouter= require('../auth/router');

//assign routers
server.use('/api/users', usersRouter);
// server.use('/api/auth', authRouter);

//middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

//root route
server.get('/', (req, res) => {
  res.send("<h1>Welcome to my humble sever</h1>");
});

//fallback
server.use(function notFound(){
  res.status(404).json({Error: "Sorry, we could not find what you are looking for"})
});

module.exports= server;
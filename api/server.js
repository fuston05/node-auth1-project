const express= require('express');
const helmet= require('helmet');
const cors= require('cors');
const session= require('express-session');
const restricted= require('../auth/restricted-middleware');

//define routers
const usersRouter= require('../users/usersRouter');
const authRouter= require('../auth/router');

const server= express();


const secret= process.env.SECRET || "This is a big secret";
const sessionConfig= {
  secret: secret,
  name: 'ses',
  cookie: {
    maxAge: 1000 * 60 * 60, //1hr
    secure: false,// true in production
    httpOnly: true //no js access
  },
  resave: false,
  saveUninitialized: true //GDRP Laws
};

//middleware
server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));

//assign routers
server.use('/api/users', restricted, usersRouter);
server.use('/api/auth', authRouter);

//root route
server.get('/', (req, res) => {
  res.send("<h1>Welcome to my humble sever</h1>");
});

//fallback
server.use(function notFound(){
  res.status(404).json({Error: "Sorry, we could not find what you are looking for"})
});

module.exports= server;
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const userRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session({
  name: 'galleta',
  secret: 'Secreton',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: false,
  },
  rolling: true,
  resave: false,
  saveUnitialized: false,
}))

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

 server.use((err, req, res, next) => {
   res.status(err.status || 500).json({
     message: err.message,
     stack: err.stack,
   });
 });

module.exports = server;

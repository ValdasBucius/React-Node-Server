const express = require('express');
const morgan = require('morgan');

const app = express();
const router = require('./routes/userRoutes');
// 1) Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from the middleware 📧');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/users', router);

module.exports = app;

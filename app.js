const express = require('express');
const fs = require('fs');
const app = express();

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);

const getUsers = app.get('/api/v1/users', (req, res) => {
  res.status(200).json({
    status: 'successful',
    data: {
      users,
    },
  });
});

const port = 9000;
app.listen(port, () => {
  console.log('Server is listening');
});

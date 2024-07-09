const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

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

const createUser = app.post('/api/v1/users', (req, res) => {
  const newId = users[users.length - 1].id + 1;
  const newUser = Object.assign({ id: newId }, req.body);
  users.push(newUser);

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: 'successfull',
        data: {
          users: newUser,
        },
      });
    }
  );
});

const getUser = app.get('/api/v1/users/:id', (req, res) => {
  const id = req.params.id * 1;
  if (id > tour.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const user = users.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const updateUser = app.patch('/api/v1/users/:id', (req, res) => {
  if (req.params.id > users.length) {
    return res.status(404).json({
      status: 'failed',
      message: `There's no such id`,
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: '<Updated tour here>',
    },
  });
});

const deleteUser = app.delete('/api/v1/users/:id', (req, res) => {
  if (req.params.id > users.length) {
    return res.status(404).json({
      status: 'failed',
      message: `There's no such id`,
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

module.exports = app;

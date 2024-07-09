const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getUsers = (req, res) => {
  res.status(200).json({
    status: 'successful',
    data: {
      users,
    },
  });
};

exports.createUser = (req, res) => {
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
};

exports.getUser = (req, res) => {
  const id = req.params.id * 1;
  if (id > users.length) {
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
      requestedAt: req.requestTime,
    },
  });
};

exports.updateUser = (req, res) => {
  if (req.params.id > users.length) {
    return res.status(404).json({
      status: 'failed',
      message: `There's no such id`,
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: '<Updated user here>',
    },
  });
};

exports.deleteUser = (req, res) => {
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
};

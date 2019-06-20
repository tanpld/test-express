const db = require('../db');
const shortid = require('shortid');

module.exports.index = (req, res) => {
  res.render('users/index', {
    users: db.get('users').value(),
  });
};

module.exports.search = (req, res) => {
  const q = req.query.q;
  const matchedUsers = db
    .get('users')
    .value()
    .filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  res.render('users/index', {
    users: matchedUsers,
  });
};

module.exports.createView = (req, res) => {
  res.render('users/create.pug');
};

module.exports.createAction = (req, res) => {
  const errors = [];
  req.body.id = shortid.generate();
  if (!req.body.name) {
    errors.push('Name is required');
  }
  if (!req.body.phone) {
    errors.push('Phone is required');
  }
  if (errors.length) {
    res.render('users/create', {
      errors: errors,
      values: req.body,
    });
    return;
  }
  db.get('users')
    .push(req.body)
    .write();
  res.redirect('/users');
};

module.exports.user = (req, res) => {
  const id = req.params.id;
  const user = db
    .get('users')
    .find({ id: id })
    .value();
  console.log(user);
  res.render('users/view', {
    user: user,
  });
};

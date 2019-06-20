const md5 = require('md5');
const db = require('../db');

module.exports.login = (req, res) => {
  res.render('auth/login', {
    users: db.get('users').value(),
  });
};

module.exports.loginAction = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = db
    .get('users')
    .find({ email: email })
    .value();

  if (!user) {
    res.render('auth/login', {
      errors: ['User does not exist'],
      values: req.body,
    });
    return;
  }

  const hashedPassword = md5(password);
  if (user.password !== hashedPassword) {
    res.render('auth/login', {
      errors: ['Wrong password'],
      values: req.body,
    });
    return;
  }
  res.cookie('userId', user.id);
  res.redirect('/users');
};

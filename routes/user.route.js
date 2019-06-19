const express = require('express');
const shortid = require('shortid');

const db = require('../db');

const router = express.Router();

router.get('', (req, res) => {
  res.render('users/index', {
    users: db.get('users').value(),
  });
});

router.get('/search', (req, res) => {
  const q = req.query.q;
  const matchedUsers = db
    .get('users')
    .value()
    .filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  res.render('users/index', {
    users: matchedUsers,
  });
});

router.get('/create', (req, res) => {
  res.render('users/create.pug');
});

router.post('/create', (req, res) => {
  req.body.id = shortid.generate();
  db.get('users')
    .push(req.body)
    .write();
  res.redirect('/users');
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const user = db
    .get('users')
    .find({ id: id })
    .value();
  console.log(user);
  res.render('users/view', {
    user: user,
  });
});

module.exports = router;

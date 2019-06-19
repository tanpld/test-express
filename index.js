const express = require('express');
const app = express();
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = lowdb(adapter);
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.defaults({ users: [] }).write();

// const users = [
//   {
//     id: '1',
//     name: 'Alex',
//   },
//   {
//     id: '2',
//     name: 'Anna',
//   },
// ];

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index', {
    name: 'Alex',
  });
});

app.get('/users', (req, res) => {
  res.render('users/index', {
    users: db.get('users').value(),
  });
});

app.get('/users/search', (req, res) => {
  const q = req.query.q;
  const matchedUsers = db
    .get('users')
    .value()
    .filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  res.render('users/index', {
    users: matchedUsers,
  });
});

app.get('/users/create', (req, res) => {
  res.render('users/create.pug');
});

app.post('/users/create', (req, res) => {
  db.get('users')
    .push(req.body)
    .write();
  res.redirect('/users');
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));

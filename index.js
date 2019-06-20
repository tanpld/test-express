const express = require('express');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/user.route');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static('public'));

app.use('/users', userRoute);

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index', {
    name: 'Alex',
  });
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));

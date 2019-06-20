require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');

const authMiddleware = require('./middlewares/auth.middleware');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public'));

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index', {
    name: 'Alex',
  });
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));

const express = require('express');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const Routes = require('./routes/route.js');
const { engine } = require('express-handlebars');
const path = require('path');
const mysqlStore = require('express-mysql-session')(session);
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('./helpers/hbs.js');
const app = express();
require('dotenv').config();
require('./controller/auth.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handlebars
app.engine(
  '.hbs',
  engine({
    helpers: { formatDate, stripTags, truncate, editIcon, select },
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');
app.set('views', './views');

//static folder

app.use(express.static(path.join(__dirname, 'public')));

const options = {
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
  createDatabaseTable: true,
};

const sessionStore = new mysqlStore(options);

app.use(
  session({
    secret: 'my secret key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  res.locals.image =
    req.user && req.user.photos && req.user.photos.length > 0
      ? req.user.photos[0].value
      : null;
  // console.log(res.locals.user, 'res.locals.user');
  next();
});

app.use('/', Routes);

app.listen(process.env.PORT, () => {
  console.log(`app is running on ${process.env.PORT}`);
});

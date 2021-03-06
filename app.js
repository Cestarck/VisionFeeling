require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cloudinary   = require('cloudinary');

const session    = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash      = require("connect-flash");

const cows       = require('cows');
const chalk      = require('chalk');
const vacas      = cows();
const vacaRandom = vacas[Math.floor(Math.random() * 250)];

//variables de entorno para conexion a la base de datos mongo
let userMongo=process.env.USERDB;
let passMongo=process.env.PASSWORDDB;
let cloudinaryName=process.env.CLOUD_NAME;
let cloudinaryApiKey=process.env.CLOUD_API_KEY;
let cloudinarySecret=process.env.CLOUD_SECRET;

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://'+userMongo+':'+passMongo+'@ds125628.mlab.com:25628/vision_feeling', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });
  cloudinary.config({
    cloud_name: cloudinaryName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinarySecret
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

hbs.registerHelper('ifUndefined', (value, options) => {
  if (arguments.length < 2)
      throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined ) {
      return options.inverse(this);
  } else {
      return options.fn(this);
  }
});

// default value for title local
app.locals.title = 'Express';

// Enable authentication using session + passport
app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))
app.use(flash());
require('./passport')(app);

const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

const psychRoutes = require('./routes/psych');
app.use('/psych', psychRoutes);

const userRoutes = require('./routes/user');
app.use('/user', userRoutes);
// Aplicacion levantada
console.log(chalk.yellow(vacaRandom));
// console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
module.exports = app;

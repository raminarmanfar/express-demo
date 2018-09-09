const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticator');
const express = require("express");
const config = require('config');

const homeRoute = require('./routes/home');
const coursesRoute = require('./routes/courses');
const genresRoute = require('./routes/genres');
const postsRoute = require('./routes/posts');


// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

const app = express();

// Define routers
app.use('/', homeRoute);
app.use('/api/courses', coursesRoute);
app.use('/api/genres', genresRoute);
app.use('/api/posts', postsRoute);


// Templating Engins (Pug, Mustache, EJS). We work with Pug here.
app.set('view engine', 'pug');
app.set('views', './views'); // default (this line is optional)

// get evnironment type such as: development, production, or deployment
console.log(`Node_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

app.use(helmet());
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled.');
  startupDebugger('Morgen enabeld...');
}

// Db work...
dbDebugger('Connected to the database...');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(authenticate);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
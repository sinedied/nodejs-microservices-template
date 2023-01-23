const express = require('express');
const cookieParser = require('cookie-parser');
const pino = require('pino-http')();

const router = require('./routes/index');
const auth = require('./middlewares/auth');
const fetch = require('./middlewares/fetch');

const app = express();

app.use(pino);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);
app.use(fetch);

app.use('/api', router);

module.exports = app;


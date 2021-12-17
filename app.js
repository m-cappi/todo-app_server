var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const { notFound, errorHandler } = require('./middleware/ErrorMiddleware');

var indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const tasksRouter = require('./routes/tasks');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/tasks', tasksRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

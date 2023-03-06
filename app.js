const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');

const { initializeMongoDB } = require('./db/db');

initializeMongoDB();

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const applicationRouter = require('./routes/application');

const { isAuthenticated } = require('./controllers/user.controllers');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/v1', indexRouter);
app.use('/api/v1/auth/user', userRouter);
app.use('/api/v1/applications', isAuthenticated, applicationRouter);

module.exports = app;

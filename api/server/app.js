// app.js
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import activitiesRouter from './routes/activities';

var app = express();
app.use(
	session({
		secret: 'ssshhhhh',
		saveUninitialized: true,
		resave: true,
		cookie: { maxAge: 60000 }
	})
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../client/build')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/activities', activitiesRouter);
export default app;

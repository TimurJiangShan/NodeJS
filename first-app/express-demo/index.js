const express = require('express');
const Joi = require('joi');
const app = express();
const logger = require('./middleware/logger');
const helmet = require("helmet");
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const courses = require('./routes/courses');
const home = require('./routes/home');


app.use(express.json()); // 使用中间件 req.body
app.use(express.urlencoded({ extended: true })); // 
app.use(express.static('public')); // serve static content
app.use(helmet());
// next: next middleware function
app.use(logger);

app.use('/api/courses', courses);
app.use('/', home);

app.set('view engine', 'pug');
app.set('views' ,'./views');

// Configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`); // 默认是development

/**
 * 切换环境 export NODE_ENV=production
*/

/**
 * 用Debugger的时候别忘了先设置环境变量
 * export DEBUG=app:startup
*/

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

// Db work...
dbDebugger('Connected to the database...');

// Portr
// export PORT=5000 指定端口号
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})
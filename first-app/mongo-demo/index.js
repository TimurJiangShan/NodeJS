const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground') // 返回一个promise
  .then(() => console.log('Connected to MongoDB...'))
  .catch(error => console.error("Could not connect to MongoDB...", error));
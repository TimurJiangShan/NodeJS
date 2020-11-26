const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground') // 返回一个promise
  .then(() => console.log('Connected to MongoDB...'))
  .catch(error => console.error("Could not connect to MongoDB...", error));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

// Classes, Objects

const Course = mongoose.model('Course', courseSchema);
const course = new Course({
  name: 'Node.js Course',
  author: 'Jiangshan',
  tags: ['node','backend'],
  isPublished: true,
});
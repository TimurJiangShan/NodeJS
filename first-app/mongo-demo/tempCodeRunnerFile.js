const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');

// get all the published backend courses,
// sort them by their name,
// pick only their name and author,
// and display them,

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
  __v: String,
});

const Course = mongoose.model('Course', courseSchema);
async function getCourses() {
  const courses = await Course
    .find()
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  console.log(courses);
}

getCourses();
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

const Course = mongoose.model('Course', courseSchema); // 第一个参数是 collection的名字
// async function getCourses() {
//   const courses = await Course
//     .find({ isPublished: true, tags: "backend" })
//     .sort({ name: 1 })
//     .select({ name: 1, author: 1 });
//   return courses;
// }

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

// Get all the published frontend and backend courses,
// Sort them by their price in a descending order
// pick only their name and author
// and display them

// async function getCourses() {
//   const courses = await Course
//     .find({ isPublished: true }) // 将requried和optional分开
//     .or([ { tags: "frontend"} , { tags: "backend" }])
//     .sort({ price: -1})
//     .select({ name: 1, author: 1 });
//   return courses;
// }

// Get all the publshed courses that are $15 or more,
// or have the word 'by' in their title

async function getCourses(){
  const courses = await Course  
    .find({ isPublished: true })
    .or([{ price: { $gte: 15 }}, { name: /.*by.*/ } ])
  return courses;
} 

run();
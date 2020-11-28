const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => {
    console.log("Connecting succeeded");
  })
  .catch(() => {
    console.log("Connecting failed");
  });

// get all the published backend courses,
// sort them by their name,
// pick only their name and author,
// and display them,


// 箭头函数没有自己的this

// Build-in validator

const courseSchema = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  category: {
    enum: ['web','browser','ml'],
    required: true,
    type: String,
  },
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
  },
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

async function createCourse() {
  
  const course = new Course({
    _id: 'asdf',
    name: 'Angular Course',
    author: 'Jiangshan',
    tags: ['angular','frontend'],
    isPublished: false,
    category: 'web',
  });
  
  const result = await course.save(); // 异步的
  console.log(result);
}

createCourse();
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
    .or([
      { price: { $gte: 15 }}, 
      { name: /.*by.*/i } ])
  return courses;
} 


async function updateCourse(id) {

  // Approach : query first
  // findById();
  // Modify its propertities
  // save

  // const course = await Course.findById(id);
  // console.log(course);

  // if(!course) return;
  // course.isPublished = false;
  // course.author = "Another author";
  // const result = await course.save();
  // console.log(result);


  // Approach Update first
  // Update directly
  // Optinally, get the updated document
  const course = await Course.findByIdAndUpdate(id, 
      { $set: { name: 'jason bourne', isPublished: false }}, { new: true });
  console.log(course);
}

async function deleteCourse(id){
  const result = await Course.deleteOne({ _id : id });
  console.log(result);
}

// deleteCourse("5a68fdc3615eda645bc6bdec");


// run();
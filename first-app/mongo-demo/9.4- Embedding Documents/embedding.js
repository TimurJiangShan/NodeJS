const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: authorSchema
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author,
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

// async function updateAuthor(courseId) {
//   const course = await Course.findById(courseId);
//   course.author.name = "王后雄";
//   await course.save();
// }

async function updateAuthor(courseID) {
  const course = await Course.update({ _id: courseID }, {
    $set: {
      "author.name": "曲一线"
    }
  });
  console.log(course);
}

updateAuthor('5fc30369e7f86f74f17ed12a');

// createCourse('.NET Course', new Author({ name: 'Mosh', bio: "CCC", website: "www.github.com" }));

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
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors,
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

// async function updateAuthor(courseID) {
//   const course = await Course.update({ _id: courseID }, {
//     $set: {
//       "author.name": "曲一线"
//     }
//   });
//   console.log(course);
// }

// updateAuthor('5fc30369e7f86f74f17ed12a');

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  await course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  console.log(author);
  author.remove();
  await course.save();
}

// addAuthor("5fc30d4bef11377f0e02927a", new Author({ name: 'Jack', bio: "abcd", website: "www.google.com" }));
removeAuthor("5fc30d4bef11377f0e02927a", "5fc30d4bef11377f0e029278");

// createCourse('.NET Course', [
//   new Author({ name: 'Mosh', bio: "CCC", website: "www.github.com" }),
//   new Author({ name: 'Lily', bio: "CCC", website: "www.github.com" })
// ]);

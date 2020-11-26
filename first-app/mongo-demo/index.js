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
async function createCourse() {
  
  const course = new Course({
    name: 'Angular Course',
    author: 'Jiangshan',
    tags: ['angular','frontend'],
    isPublished: true,
  });
  
  const result = await course.save(); // 异步的
  console.log(result);
}

async function getCourses() {
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)

  const courses = await Course
    // .find({ author: 'Jiangshan', isPublished: true })
    // .find({ price: { $gt: 10, $lte: 20 } }) // 原生的JS无法使用 大于或者等于这种， 只用通过 $＋ 符号 凑对象的方式来描述
    .find({ price: { $in: [10,15,20] } })      // 用数组来描述 $in 操作符
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

// createCourse();
getCourses();

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

  /**
   * 分页：
   * 一般是像这种形式
   * /api/courses?pageNumber=2&pageSize=10
  */

  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
    // .find({ author: 'Jiangshan', isPublished: true })
    // .find({ price: { $gt: 10, $lte: 20 } }) // 原生的JS无法使用 大于或者等于这种， 只用通过 $＋ 符号 凑对象的方式来描述
    // .find({ price: { $in: [10,15,20] } })      // 用数组来描述 $in 操作符
    .find({ author: /.*shan.*/ })
    // .or([{ author: 'Jiangshan' }, { isPublished: true }]) // Or操作符，author是Jiangshan，或者 isPublished是true。 用对象数组这种形式。
    // .and([{ author: 'Jiangshan' }, { isPublished: true }])
    .skip((pageNumber - 1) * pageSize)  // 这两行是分页的
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    // .count(); // .count() ： 返回有多少项
  console.log(courses);
}
/**
 * 正则表达式：
 * /pattern/
 * ^: starts with something（以。。。为开头）  /^Mosh/
 * $: ends with something /Hamidani$/i    i代表大小写不敏感
*/
//  /.*Mosh.*/i 匹配中间有Mosh的字符串。 i代表忽略大小写

// createCourse();


// getCourses();

const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json()); // 使用中间件

const courses = [
  { id: 1, name: 'course1'},
  { id: 2, name: 'course2'},
  { id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
})


app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) 
    res.status(200).send('The course with the given ID was not found');
  res.send(course);

})

app.post('/api/courses', (req, res) => {

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  };

  const { error, value } = schema.validate(req.body, options);
  if(error) {
    res.status(200).send(error.details[0].message);
    return;
  }

  if(!req.body.name || req.body.name.length < 3) {
    // 400 Bad Request
    res.status(400).send('Name is required and should be minium 3 characters');
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  }
  courses.push(course);
  res.send(course);

})

app.put('/api/courses/:id', (req, res) => {
  // Look up the course
  // If not existing, return 404
  const course = courses.find( c => c.id === parseInt(req.params.id));
  if(!course) {
    return res.status(200).send('The course with the given ID was not found');
  }

  // Validate 
  // If invalid, return 400 - Bad rquiest
  const { error, value } = validateCourse(req.body);

  if(error) {
    res.status(200).send(error.details[0].message);
    return;
  }

  // Update course
  course.name = req.body.name;
  // Return the updated course
  res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
  // Loop up the course
  // Not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) 
    return res.status(200).send('Cannot find the id');
  
    // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // Return the same course
  res.send(course);
});

function validateCourse(course){
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  };

  return schema.validate(course, options);
}


// Port
// export PORT=5000 指定端口号
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
const { Course }  = require('../models/courses');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


async function getCourse(){
  const courses = await Course
    .find()
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  return courses;
}

router.get('/', async (req, res) => {
  const courses = await getCourse();
  res.send(courses);
})

router.get('/:id', async (req, res) => {
  // const course = courses.find(c => c.id === parseInt(req.params.id));
  const course = await Course
    .find({ _id: req.params.id})
    .sort({ name: 1 })
  if(!course) 
    res.status(200).send('The course with the given ID was not found');
  res.send(course);
});

router.post('/', async (req, res) => {
  // const schema = Joi.object({
  //   name: Joi.string().min(3).required(),
  // });

  // const options = {
  //   abortEarly: false, // include all errors
  //   allowUnknown: true, // ignore unknown props
  //   stripUnknown: true // remove unknown props
  // };

  // const { error, value } = schema.validate(req.body, options);
  // if(error) {
  //   res.status(200).send(error.details[0].message);
  //   return;
  // }

  // if(!req.body.name || req.body.name.length < 3) {
  //   // 400 Bad Request
  //   res.status(400).send('Name is required and should be minium 3 characters');
  //   return;
  // }
  // const course = {
  //   id: courses.length + 1,
  //   name: req.body.name,
  // }
  // courses.push(course);
  // res.send(course);
  try {
    const course = new Course(req.body);
    await course.save();
  } catch (error) {
    res.status(200).send(error.message);
  }
})

router.put('/', async (req, res) => {
  // Look up the course
  // If not existing, return 404
  // const course = courses.find( c => c.id === parseInt(req.params.id));
  // if(!course) {
  //   return res.status(200).send('The course with the given ID was not found');
  // }

  // // Validate 
  // // If invalid, return 400 - Bad rquiest
  // const { error, value } = validateCourse(req.body);

  // if(error) {
  //   res.status(200).send(error.details[0].message);
  //   return;
  // }

  // // Update course
  // course.name = req.body.name;
  // // Return the updated course
  // res.send(course);
  try {
    await Course
      .findByIdAndUpdate(req.query.id,{
        $set: {
          name: req.body.name,
          isPublished: req.body.isPublished,
          price: req.body.price
        }
      });
    res.status(200).send("Update succeeded");
  } catch (error) {
    res.status(400).send(error.message);
  }
})

router.delete('/', async (req, res) => {
  // Loop up the course
  // Not existing, return 404
  // const course = courses.find(c => c.id === parseInt(req.params.id));
  // if(!course) 
  //   return res.status(200).send('Cannot find the id');
  
  //   // Delete
  // const index = courses.indexOf(course);
  // courses.splice(index, 1);

  // // Return the same course
  // res.send(course);
  const result = await Course.deleteOne({ _id: req.query.id });
  console.log(result);

  // 注意区分queryString和params。
  /**
   * 如果想在postman的params里面设置值，路由就得 / ， req.query
   * 如果想直接在浏览器直接输ID，那么路由就得设置成  /:id , req.params
  */
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

module.exports = router;
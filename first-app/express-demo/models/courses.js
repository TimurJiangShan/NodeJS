const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => {
    console.log("Connecting succeeded");
  })
  .catch(() => {
    console.log("Connecting failed");
  });

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

const Course = mongoose.model('Course', courseSchema);

module.exports.Course = Course;
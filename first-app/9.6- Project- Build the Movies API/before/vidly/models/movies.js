const mongoose = require('mongoose');
const Joi = require('joi');
const Genre = require('./genre');

const moviesSchema = new mongoose.Schema({
  title: String,
  numberInStock: Number,
  dailyRentalRate: Number,
  _v: Number,
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
  }
});

const Movie = mongoose.model('Movie', moviesSchema);

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(3).required()
  }

  return Joi.validate(movie, schema);
}

async function createMovie(title, numberInStock, dailyRentalRate, _v, genre) {
  const movie = new Movie({
    title, 
    numberInStock,
    dailyRentalRate,
    _v,
    genre,
  }); 
  
  const result = await movie.save();
  console.log(result);
}

async function listMovies() { 
  const courses = await Movie.find();
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

async function addGenre(movieId, genre) {
  const movie = await Movie.findById(movieId);
  movie.genres.push(genre);
  await movie.save();
}

async function removeGenre(movieId, genreId) {
  const movie = await Movie.findById(movieId);
  const genre = movie.genres.id(genreId);
  console.log(genre);
  genre.remove();
  await movie.save();
}

createMovie('Gone with the wind', 10, 2, 1,  "5fc5c6a57b8c16a933688898");
exports.Movie = Movie;
exports.validate = validateMovie;

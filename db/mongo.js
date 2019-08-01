const mongoose = require('mongoose');
//don't actually need newurlparser until mongoos actually drops old url parser in the future
mongoose.connect('mongodb://localhost:27017/movieListDataBase', {useNewUrlParser: true});

// var Schema = mongoose.Schema;


var MovieSchema = new mongoose.Schema({
  title: String,
  watched: Boolean,
  imdbScore: Number
})
const MovieModel = mongoose.model('Movie', MovieSchema);

const save = (movie) => {

  //needed to save a database first before we could use findOneandUdpate
  //memorize
  // let newMovieModel = new MovieModel({title: movie.title, watched: movie.watched})
  const filter = {title: movie.title};
  const update = {watched: movie.watched};
  //(function) filter-> looks to see if it can find that user-submitted data
  //(key) new -> true if entry doesn't exist,
  //(key) upsert -> sets a flag to make a new entry in database
  //update: will update the new movie title to the database
  return MovieModel.findOneAndUpdate(filter, update, {new: true, upsert: true});  
}
const retrieve = () => {
  return MovieModel.find({});
}

const searchDb = (term) => {
  console.log('term', term);
  return MovieModel.find( { title: { $regex: `${term}` } } );
}

module.exports = {
  MovieModel,
  save,
  retrieve,
  searchDb
}
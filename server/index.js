//require express library that I installed
const express = require('express')
const app = express()
//set port to run server on
const port = 3000
const bodyParser = require('body-parser')
//destructure so we don't have a key:value pair of a function
const {save, retrieve, searchDb} = require('../db/mongo.js')

//previously was set to public, changed to client/dist
//client dist is where index.html will be stored
app.use(express.static('./public/dist')) //look up docs
app.use(bodyParser());

//req.body should be the movie
app.post('/movieList', (req, res) => {
  var movie = req.body;
  console.log('this should be req.body for post: ************', req.body)
  save(movie).then(() => {
    //201 is creating something
    //202 is for updating/saving
    res.status(201);
    res.send('Uploaded to db successfully 👍');
  }).catch((err) => {
    console.log(err);
  })
})

//initial git
//I: 2 args. 1. the root directory of website 2. anon function that takes in req res

app.post('/searchMovies', (req, res) => {
  //console.log(req.body);
  searchDb(req.body.butt).then((results) => {
    console.log('***********************\n', results);
    res.status(200);
    res.send(results)
  })
})

app.get('/movielist', (req, res) => {
  
  retrieve().then( (allMovies) => {
    //200 
    // console.log('list of all movies from get', allMovies);
    res.status(200);
    res.send(allMovies)
  }).catch((err) => {
    console.log(err);
  })
  // console.log('YOU DID IT. Get Request Achieved. You did it. Good job.')
})

app.listen(port, () => console.log(`listening on port ${port}`));



// app.post( (req, res) => {
//   res.send('POST request')
// })




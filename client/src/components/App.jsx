import React from 'react';
import axios from 'axios';
import Movie from './Movie.jsx';
import Search from './Search.jsx';
// import Component from 'react'


export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      movies: [],
      // searchTextBoxValue: '',
      addMovieTextBoxValue: '',
      search: false,
      value: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
    this.handleAddMovie = this.handleAddMovie.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(e) {
    // console.log('should be e.target.value ***', e.target.value);
    this.setState({value: e.target.value})
    console.log(this.state.value);
  }

  handleAddMovie(event) {
    this.setState({
      addMovieTextBoxValue: event.target.value
    })
  }

  handleSubmit(event){
    console.log('should be event***', this.state.value)
    event.preventDefault();
    var newMovie = {
      title: this.state.value,
      watched: false
    }
    axios.post('/movieList', newMovie)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleSearch(event) {
    event.preventDefault();
    $.ajax('http://localhost:3000/searchMovies', {
      type: 'POST',
      data: {butt: this.state.value},
      success: (results) => {
        console.log('results:', results);
      }
    })
  }

  getData(){
    axios.get('/movieList').then((response) => {
      this.setState({movies: response})
      console.log('state', this.state)
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    const { movies, value, /*searchTextBoxValue, */ addMovieTextBoxValue, search } = this.state;
    return (
      <div>
        <h1>Movie List</h1>
        <form onSubmit={this.handleSubmit}>
          <label> Add Movie Title:<input type="text"  value = {addMovieTextBoxValue}  onChange={this.handleAddMovie} /></label>
          <input type="submit" value="submit"/>
        </form>
        <form onSubmit={this.handleSearch}>
          <label> Search Movie Title:<input type="text"   value = {value}  onChange={this.handleChange} /></label>
          <input type="submit" value="submit"/>
        </form>
        <button onClick = {this.getData}>Get Data</button>
        <ul>
          {search === true && movies.map((movie, i) => {
            if (value === '') {
              return <li key={i}> {movie.title}</li>
            } else if (movie.title.includes(value)) {
              return <li key={i}> {movie.title}</li>
            }
          })}
        </ul>
      </div>
    )
  }
}


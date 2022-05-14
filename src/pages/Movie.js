import React, { Component } from 'react';
import '../App.css';
import { API_URL, API_KEY } from '../config.js'
import Nav from '../components/Nav/Nav';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import MovieInfoBar from '../components/MovieInfoBar/MovieInfoBar';
import Actor from '../components/Actor/Actor';
import Grid from '../components/Grid/Grid';
import Spinner from '../components/Spinner/Spinner';
import Back from '../components/Back/Back';


class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true })
    //First, fetch the movie
    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`
    this.fetchItems(endpoint);
  }

  fetchItems = (endpoint) => {
    fetch(endpoint)
    .then(result => result.json())
    .then(result => {
      if(result.status_code) {
        this.setState({ loading: false });
      } else {
        this.setState({ movie: result }, () => {
          // .. fetch actors in setState callback
          const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`
          fetch(endpoint)
          .then(result => result.json())
          .then(result => {
            const directors = result.crew.filter( (member) => member.job === "Director");
            this.setState({
              actors: result.cast,
              directors,
              loading: false
            })
          })
        })
      }
    })
    .catch(error => console.error('Error', error))
  }

  render() {
    return (
      <div className="movie">
        {this.state.movie ?
        <div>
          <Nav movie={this.props.location.movieName} />
          <MovieInfo movie={this.state.movie} directors={this.state.directors} />
          <MovieInfoBar
           time={this.state.movie.runtime}
           budget={this.state.movie.budget}
           revenue={this.state.movie.revenue}
           />
        </div>
    : null }
    {this.state.actors ?
    <div className="movie-grid">
      <Grid header={'Actors'}>
        {this.state.actors.map( (element, i) => {
          return <Actor key={1} actor={element} />
        })}
      </Grid>
      <Back />
    </div>
      : null }
      {!this.state.actors && !this.state.loading ? <h1>No Movie Found</h1> : null}
      {this.state.loading ? <Spinner /> : null}
  </div>
)
}
}

export default Movie;

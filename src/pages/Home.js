import React, { Component } from 'react'
import '../App.css';
import Hero from '../components/Hero/Hero';
import SearchBar from '../components/SearchBar/SearchBar';
import Grid from '../components/Grid/Grid';
import MovieThumb from '../components/MovieThumb/MovieThumb';
import Load from '../components/Load/Load';
import Spinner from '../components/Spinner/Spinner';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../config.js'


class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ''
  }

  componentDidMount() {
    if (sessionStorage.getItem('HomeState')) {
    // take local storage string and convert it back to state object
      const state = JSON.parse(sessionStorage.getItem('HomeState'));
      this.setState({ ...state });
    } else {
    this.setState({ loading: true })
    // URL where we get the data
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    // fetch items
    this.fetchItems(endpoint);
  }
}

  searchItems = (searchTerm) => {
    let endpoint = '';
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    })

    if (searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=em-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  }

  loadMoreItems = () => {
    const {searchTerm, currentPage } = this.state;

    let endpoint = '';
    this.setState({ loading: true })
    if (searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=em-Us&page=${this.state.currentPage + 1}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=em-US&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  }

  //fetch function
  fetchItems = (endpoint) => {
    const { movies, heroImage, searchTerm } = this.state;

    fetch(endpoint)
    .then(result => result.json())
    .then(result => {
      this.setState({
        movies: [...movies, ...result.results],
        heroImage: heroImage || result.results[0],
        loading: false,
        currentPage: result.page,
        totalPages: result.total_pages
      }, () => {
        // LOCAL STORAGE: Remember state for the next mount if we're not in search view
        if (searchTerm === "") {
          sessionStorage.setItem('HomeState', JSON.stringify(this.state));
        }
      })
    })
    .catch(error => console.error('Error', error))
  }

  render() {
    const { movies, heroImage, loading, currentPage, totalPages, searchTerm} = this.state;

    return (
      <div className="homepage">
      {heroImage ?
      <div>
        <Hero
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
          title={heroImage.original_title}
          text={heroImage.overview}
        />
          <SearchBar callback={this.searchItems} />
      </div> : null }
        <div className="home-grid">
          <Grid
            header={searchTerm ? 'Search Results' : 'Popular Movies'}
            loading={ loading }
          >
          {movies.map( (element, i) => (
           <MovieThumb
              key={i}
              clickable={true}
              image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : '../images/no_image.jpg'}
              movieId={element.id}
              movieName={element.original_title}
            />
          ))}
          </Grid>
          {loading ? <Spinner /> : null}
          {(currentPage <= totalPages && !loading) ?
          <Load text='LOAD MORE' onClick={this.loadMoreItems} />
          : null
        }
        </div>
      </div>
    )
  }
}


export default Home;

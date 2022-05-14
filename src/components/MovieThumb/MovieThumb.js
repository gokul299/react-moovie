import React from 'react'
import './MovieThumb.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { noImage } from '../../images/no_image.jpg'

const MovieThumb = ({ image, movieId, movieName, clickable }) => (
  <div className="moviethumb">
    {/* You can send props via the Links "to" object. Here we create our own "movieName" */}
    {clickable ?
      <Link to={{ pathname: `/${movieId}`,  movieName: `${movieName}`}}>
        <img className="clickable" src={image} alt="moviethumb" />
      </Link>
      :
      <img src={ image } alt="moviethumb" />
    }
  </div>
)

MovieThumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  movieName: PropTypes.string
}


export default MovieThumb;

import React from 'react';
import './Actor.css';
import { IMAGE_BASE_URL } from '../../config.js'
import { noImage } from '../../images/no_image.jpg'
import PropTypes from 'prop-types';

const Actor  = ({actor}) => {

  const POSTER_SIZE = 'w154';

  return (
    <div className="actor">
      <img
      src={actor.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` :  { noImage }  }
      alt="Actor Thumbnail"
      />
      <span className="actor-name">{actor.name}</span>
      <span className="actor-character">{actor.character}</span>
    </div>
  )
}

Actor.propTypes = {
  actor: PropTypes.object
}

export default Actor;

import React from 'react';
import './MovieInfoBar.css';
import { calcTime, convertMoney } from '../../helpers.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons'

const MovieInfoBar  = (props) => {
  return (
    <div className="movieinfobar">
      <div className="movieinfobar-content">
        <div className="info-item">
            <span className="icon"><FontAwesomeIcon icon={ faClock } /></span>
            <span className="movieinfobar-info">Running time: {calcTime(props.time)}</span>
        </div>
        <div className="info-item">
            <span className="icon"><FontAwesomeIcon icon={ faDollarSign } /></span>
            <span className="movieinfobar-info">Budget: {convertMoney(props.budget)}</span>
        </div>
        <div className="info-item">
            <span className="icon"><FontAwesomeIcon icon={ faTicketAlt } /></span>
            <span className="movieinfobar-info">Revenue: {convertMoney(props.revenue)}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieInfoBar;

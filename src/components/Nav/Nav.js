import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  return (
    <div className="navigation">
    <div className="navigation-content">
      <Link to="/">
        <p>Home</p>
      </Link>
      <p>/</p>
      <p>{props.movie}</p>
      </div>
    </div>
  )
}

export default Nav;

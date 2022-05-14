import React from 'react'
import './Back.css';

const Back = (props) => {
  return (
      <div className="backbtn" onClick={props.onClick}>
        <p>Back To Search Results</p>
      </div>
    );
}


export default Back;

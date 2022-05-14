import React from 'react'
import './Load.css';

const Load = (props) => {
  return (
      <div className="loadmorebtn" onClick={props.onClick}>
        <p>{props.text}</p>
      </div>
    );
}


export default Load;

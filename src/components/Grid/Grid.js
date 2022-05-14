import React from 'react'
import './Grid.css';

const Grid = (props) => {
  const renderElements = () => {
    const gridElements = props.children.map( (element, i) => {
      return (
        <div key={i} className="grid-element">
          {element}
        </div>
      )
    })
    return gridElements;
  }
  return (
      <div className="grid">
        {props.header && !props.loading ? <h1>{props.header}</h1> : null }
        <div className="grid-content">
          {renderElements()}
        </div>
      </div>
    );
}


export default Grid;

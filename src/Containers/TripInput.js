import React from 'react';

const TripInput = (props) => {
  return (
    <input className="tripInput" value={props.destination} placeholder="Add a location" />
  )
}

export default TripInput;

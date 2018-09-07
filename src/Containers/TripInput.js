import React from 'react';

const TripInput = (props) => {
  return (
  <input className="tripInput" defaultValue={props.destination} placeholder="Add a location" />
  )
}

export default TripInput;

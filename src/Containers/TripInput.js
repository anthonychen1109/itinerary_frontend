import React from 'react';

const TripInput = (props) => {
  return (
    <input defaultValue={props.destination} placeholder="Add a location" />
  )
}

export default TripInput;

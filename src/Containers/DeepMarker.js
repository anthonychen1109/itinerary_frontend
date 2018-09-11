import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class DeepMarker extends Component {
  render() {
    // return <Marker
    //   key={index}
    //   position={{ lat: 40.701074, lng: -73.987064 }}
    //   />
    console.log(this.props);
    return (
      <div>
        <Marker position={{ lat:this.props.lat, lng:this.props.lng}}/>
      </div>
    )
  }
}

export default DeepMarker;

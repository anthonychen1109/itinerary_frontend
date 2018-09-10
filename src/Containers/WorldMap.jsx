import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class WorldMap extends React.Component {

  openMarker = () => {

  }

  render() {
    const GoogleMapLocation = withGoogleMap(props => (
     <GoogleMap
       defaultCenter = { { lat: 40.701074, lng: -73.987064 } }
       defaultZoom = { 13 }
     >
     
     {this.props.coordinates.map( coordinate => {
       // console.log(typeof(coordinate[0]));
       console.log(coordinate[0], coordinate[1]);
       return <Marker position={{ lat: coordinate[0], lng: coordinate[1] }} onClick={this.openMarker}/>
     })}
     </GoogleMap>

    ));

    return (
      <div>
        <GoogleMapLocation
          containerElement={ <div style={{ height: `500px`, width: '100%' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
    )
  }
}
export default WorldMap;

import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

class WorldMap extends React.Component {
  render() {
    const GoogleMapLocation = withGoogleMap(props => (
     <GoogleMap
       defaultCenter = { { lat: 40.701074, lng: -73.987064 } }
       defaultZoom = { 13 }
     >
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

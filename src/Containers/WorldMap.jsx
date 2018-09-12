import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Link } from 'react-router-dom';

class WorldMap extends React.Component {

  state = {
    allEvents: [],
    locationEvents: []
  }

  openMarker = (destinationObj) => {
    this.getEvents()
    this.findEvents(destinationObj)
  }

  getEvents = () => {
    fetch("http://localhost:3000/events")
      .then( response => response.json() )
      .then( data => this.setState({ allEvents: data }))
  }

  findEvents = (location) => {
    const id = location.id
    const events = this.state.allEvents.filter( location => {
      return location.location_id === id
    })
    this.setState({ locationEvents: events })
  }

  render() {
    // return <Marker
    //   key={index}
    //   position={{ lat: 40.701074, lng: -73.987064 }}
    //   />
    // console.log(this.props.coordinates);
    // console.log(this.props.destinations.length);
    // console.log(this.props.coordinates);
    const GoogleMapLocation = withGoogleMap(props => (
     <GoogleMap
       defaultCenter = { { lat: 40.701074, lng: -73.987064 } }
       defaultZoom = { 1 }
     >
     {this.props.coordinates.map((coordinate, index) => {
       return <Marker
         key={index}
         position={{ lat: parseFloat(coordinate.lat), lng: parseFloat(coordinate.lng) }}
         />
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

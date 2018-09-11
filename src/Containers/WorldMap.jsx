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
    const GoogleMapLocation = withGoogleMap(props => (
     <GoogleMap
       defaultCenter = { { lat: 40.701074, lng: -73.987064 } }
       defaultZoom = { 13 }
     >
     {
       this.props.startingLocationObject &&
       <Marker
         position={{ lat: this.props.startingLocationObject.lat, lng: this.props.startingLocationObject.lng }} onClick={() => this.openMarker(this.props.startingLocationObject)}/>
     }
     {
       this.props.endingLocationObject &&
       <Marker
         position={{ lat: this.props.endingLocationObject.lat, lng: this.props.endingLocationObject.lng }}
         onClick={() => this.openMarker(this.props.endingLocationObject)}/>
     }

     {this.props.destinations.length > 0 && this.props.destinations.map((destination, index) => {
       return <Marker
         key={index}
         position={{ lat: destination.lat, lng: destination.lng }}
         onClick={() => this.openMarker(destination)}/>
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

import React, { Component } from 'react';
import NavBar from './Components/NavBar'
import CreateTrip from './Containers/CreateTrip';
import './Assets/css/styles.css';

class App extends Component {

  // state = {
  //   geoLoc: []
  // }
  //
  // gPlaces = () => {
  //   const PLACESKEY = `AIzaSyDpkp07DG_nKJDuTsQW7q4fMgMCnBQnzoU`
  // }
  // componentDidMount() {
  //   const GEOCODER = `https://geocoder.api.here.com/6.2/geocode.json`
  //   const APPID = `?app_id=Dz4FiD13CG0Y7leu90cT`
  //   const APPCODE = `&app_code=CAg9rvFkMXtmf216PFjwrQ`
  //   fetch(`${GEOCODER}${APPID}${APPCODE}&searchtext=DUMBO`)
  //     .then(res => res.json())
  //     .then(this.setGeo)
  // }
  //
  // setGeo = (geoData) => {
  //   console.log(geoData.Response.View[0].Result[0].Location.DisplayPosition)
  // }

  render() {
    return (
      <div>

        <CreateTrip />
      </div>
    );
  }
}

export default App;

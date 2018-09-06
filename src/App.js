import React, { Component } from 'react';
import NavBar from './Components/NavBar'
import CreateTrip from './Containers/CreateTrip';
import './Assets/css/styles.css';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <CreateTrip />
      </div>
    );
  }
}

export default App;

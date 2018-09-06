import React, { Component } from 'react';
import NavBar from './Components/NavBar'
import CreateTrip from './Containers/CreateTrip';
import './Assets/css/styles.css';
import {Route, Switch} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
<<<<<<< HEAD

        <CreateTrip />
=======
        <NavBar />
        <Route path='/map' component={CreateTrip} />
>>>>>>> james-dev
      </div>
    );
  }
}

export default App;

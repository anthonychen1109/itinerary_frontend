import React, { Component } from 'react';
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import CreateTrip from './Containers/CreateTrip';
import './Assets/css/styles.css';
import Login from './Components/Login'
import Register from './Components/Register'
import {Route} from 'react-router-dom'
import Profile from './Components/Profile'
class App extends Component {

  state = {
    auth: {
      currentUser: {}
    }
  }

  handleLoginUser = (user) => {
    const newAuth = {
        ...this.state.auth,
        currentUser: user
      }
      this.setState({
        auth: newAuth
      })
    }








  render() {
    const loggedIn = !!this.state.auth.currentUser.id
    return (
      <div>
        <NavBar />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/' component={Home} />
        <Route exact path='/map' render={() => <CreateTrip loggedIn={loggedIn} />} />
        <Route exact path='/login' render={() => <Login
          loggedIn={loggedIn}
         handleLoginUser={this.handleLoginUser}/>} />
        <Route exact path='/register' render={() => <Register />} />
      </div>
    );
  }
}

export default App;

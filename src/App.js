import React, { Component } from 'react';
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import CreateTrip from './Containers/CreateTrip';
import './Assets/css/styles.css';
import Login from './Components/Login'
import Register from './Components/Register'
<<<<<<< HEAD
import {Route} from 'react-router-dom'
import Profile from './Components/Profile'
=======
import Events from './Containers/Events'
import {Route, Switch} from 'react-router-dom'

>>>>>>> anthony
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




<<<<<<< HEAD
=======

>>>>>>> anthony




  render() {
    const loggedIn = !!this.state.auth.currentUser.id
    return (
      <div>
        <NavBar />
        <Route exact path='/profile' render={() => <Profile loggedIn={loggedIn} />} />
        <Route exact path='/' component={Home} />
        <Route exact path='/map' render={() => <CreateTrip loggedIn={loggedIn} />} />
        <Route exact path='/login' render={() => <Login
<<<<<<< HEAD
          loggedIn={loggedIn}
         handleLoginUser={this.handleLoginUser}/>} />
        <Route exact path='/register' render={() => <Register />} />
=======
          username={this.state.username}
          password={this.state.password}
          handleUsername={this.handleUsername}
          handlePassword={this.handlePassword} />} />
        <Route exact path='/register' render={() => <Register
          username={this.state.username}
          password={this.state.password}
          handleUsername={this.handleUsername}
          handlePassword={this.handlePassword}  />} />
        <Route exact path='/events' component={Events} />
>>>>>>> anthony
      </div>
    );
  }
}

export default App;

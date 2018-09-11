import React, { Component } from 'react';
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import CreateTrip from './Containers/CreateTrip';
import NewTrip from './Containers/NewTrip';
import './Assets/css/styles.css';
import Login from './Components/Login'
import Register from './Components/Register'
import {Route, Redirect} from 'react-router-dom'
import Profile from './Components/Profile'

class App extends Component {

  state = {
    auth: {
      authenticating: true,
      currentUser: {}
    }
  }

  handleLoginUser = (user) => {
    const newAuth = {
        ...this.state.auth,
        authenticating: false,
        currentUser: user
      }
      this.setState({
        auth: newAuth
      })
    }

    componentDidMount() {
      if (localStorage.getItem('token')) {
         fetch('http://localhost:3000/reauth', {
          "method": "GET",
          "headers": {
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Authorization": localStorage.getItem('token')
          }
        })
        .then(r => r.json())
        .then(resp => {
          this.handleLoginUser(resp)
        })
      } else {
        this.setState( prevState => ({
          auth: {
            ...prevState.auth,
            authenticating: false
          }
        }))
      }
    }

    handleLogout = () => {
    this.setState((prevState) => {
       return {
         auth: {
           ...prevState.auth,
           currentUser: {}
         }
       }
    })
    localStorage.clear()
    return <Redirect to='/home' />
  }




  render() {
    const loggedIn = !!this.state.auth.currentUser.id
    return (
      <div>
        <NavBar handleLogout={this.handleLogout} loggedIn={loggedIn} />
        <Route exact path='/profile' render={() => <Profile currentUser={this.state.auth.currentUser} loggedIn={loggedIn} />} />
        <Route exact path='/' component={Home} />
        <Route exact path='/map' render={() => <CreateTrip loggedIn={loggedIn} />} />
        <Route exact path='/newTrip' render={() => <NewTrip loggedIn={loggedIn} />} />
        <Route exact path='/login' render={() => <Login
          loggedIn={loggedIn}
         handleLoginUser={this.handleLoginUser}/>} />
        <Route exact path='/register' render={() => <Register loggedIn={loggedIn} />} />
      </div>
    );
  }
}

export default App;

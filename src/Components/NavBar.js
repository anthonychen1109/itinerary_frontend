import React, { Component } from 'react';
import { Breadcrumb , Icon } from 'antd'
import { Link } from 'react-router-dom'
export default class NavBar extends Component {


  state = {
    current: 'mail',
    theme: 'light'
  }


  handleClick = (e) => {
   console.log('click ', e);
   this.setState({
     current: e.key,
   });
 }




  render() {
    console.log(this.state.current)
    return (
      <div className="nav">

        <Breadcrumb
        theme={this.state.theme}
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal">
        <img alt="globetrotters" className="logo" src={require('../logo.png')}/>
          <Breadcrumb.Item key="Home">

            <Icon type="appstore" /> Home
          </Breadcrumb.Item>
          <Breadcrumb.Item key="Login">
            <Icon type="key" theme="outlined" /> Login
          </Breadcrumb.Item>
          <Breadcrumb.Item key="Register">
            <Icon type="edit" theme="outlined" /> Register
          </Breadcrumb.Item>
          <Breadcrumb.Item key="Map">
          <Link to='/map'>
          <Icon type="global" theme="outlined" /> Map
          </Link>
          </Breadcrumb.Item>
        </Breadcrumb>

      </div>
    )
  }
}

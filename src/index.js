import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, Redirect, Prompt } from "react-router-dom";
import './style.css';

import User from './navigation/User';

// https://www.youtube.com/watch?v=XRfD8xIOroA&t=1342s
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'WTF!',
      loggedIn: false
    };
    console.log(this.state.title);
  }

  login = () => {
    this.setState(prevState => ({
      loggedIn: !prevState.loggedIn
    }))
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <ul>
          <li>
            <NavLink to="/" exact activeStyle={{ color: 'green' }}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" exact activeStyle={{ color: 'green' }}>About</NavLink>
          </li>
          <li>
            <NavLink to="/user/Sussette" exact activeStyle={{ color: 'green' }}>Sussette</NavLink>
          </li>
          <li>
            <NavLink to="/user/Andrew" exact activeStyle={{ color: 'green' }}>Andrew</NavLink>
          </li>
        </ul>
        <Prompt
        when={!this.state.loggedIn}
        message={(location) => {
          return location.pathname.startsWith('/user') ? 'You must be logged in to view this content' : true
        }}
        />
        <input type="button" value={this.state.loggedIn ? "Log Out" : "Log In"} onClick={this.login} />
        <Route path="/" exact strict render={
          () => {
            return <h1>Welcome Home</h1>
          }
        } />
        <Route path="/about" exact strict render={
          () => {
            return <h1>Welcome About</h1>
          }
        } />
        <Route path="/user/:username" exact strict component={({match}) => (
          this.state.loggedIn ? (<User username={match.params.username}/>) : (<Redirect to="/"/>)
        )} />
      </div>
    );
  }
}

render(<Router><App /></Router>, document.getElementById('root'));

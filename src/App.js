import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auth from './components/auth';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Auth />
          <h2>Hello quick order</h2>
        </div>
      </div>
    );
  }
}

App = connect()(App);

export default App;

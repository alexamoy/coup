import React, { Component } from 'react';
import './App.css';
import { Image } from 'semantic-ui-react';
import Routes from './client/routes';
import logo from './images/coup-logo.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Image src={ logo }/>
        <Routes/>
      </div>
    );
  }
}

export default App;

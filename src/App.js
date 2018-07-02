import React, { Component } from 'react';
import './App.css';
import Routes from './client/routes';
import { Navbar } from './client/components';
import { withAuth } from 'fireview';

class App extends Component {
  state = {
    userId: ''
  }
  async componentDidMount() {
    const auth = await this.props._auth;
    const user = await auth.currentUser;
    if (user) {
      const userId = await user.uid;
      this.setState({ userId });
    }
  }
  render() {
    return (
      <div className="App">
        <Navbar userId={ this.state.userId } />
        <Routes />
      </div>
    );
  }
}

export default withAuth(App);

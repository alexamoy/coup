import React, { Component } from 'react';
import { withAuth } from 'fireview';
import db from '../../firestore';

class GameRoom extends Component {
  state = {
    roomId: this.props.match.params.id
  }
  componentDidMount(){

  }
  render() {
    return (
      this.state.players.map(player =>
        <h1>{player.username}</h1>
      )
    )
  }
}

export default withAuth(GameRoom);

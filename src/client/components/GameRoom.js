import React, { Component } from 'react';
import { withAuth } from 'fireview';
import db from '../../firestore';
import { Segment, Loader, Button } from 'semantic-ui-react';
import Game from './Game';

class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: this.props.match.params.id,
      deck: [],
      players: [],
      username: '',
      userId: '',
      profileImg: '',
      inRoom: false,
      host: ''
    };
    this.joinRoom = this.joinRoom.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
  }
  async componentDidMount() {
    try {
      const userId = await this.props.withAuth.auth.currentUser.uid;
      const user = await db.collection('users').doc(userId).get();
      const username = await user.data().username;
      const profileImg = await user.data().profileImg;
      const totalGames = await user.data().totalGames;
      const wins = await user.data().wins;
      const roomId = this.props.match.params.id;
      await db.collection('rooms').doc(roomId).onSnapshot(room => {
        const deck = room.data().deck;
        const players = room.data().players;
        const hostId = room.data().creator;
        db.collection('users').doc(hostId).onSnapshot(doc => {
          const host = doc.data().username;
          this.setState({ host });
        });
        players.forEach(player => {
          if (player.username === username) {
            this.setState({ inRoom: true });
          }
        });
        this.setState({ roomId, deck, players, username, userId, profileImg, totalGames, wins });
      });
    } catch (err) {
      console.error(err);
    }
  }
  async joinRoom() {
    try {
      const newPlayer = {
        userId: this.state.userId,
        profileImg: this.state.profileImg,
        username: this.state.username,
        wins: this.state.wins,
        totalGames: this.state.totalGames
      };
      const room = await db.collection('rooms').doc(this.state.roomId).get();
      let newPlayersArr = room.data().players;
      newPlayersArr.push(newPlayer);
      await db.collection('rooms').doc(this.state.roomId).update({
        players: newPlayersArr
      });
      this.setState({ inRoom: true });
    } catch (err) {
      console.error(err);
    }
  }
  leaveRoom() {
    try {
      let playersCopy = this.state.players.slice(0);
      playersCopy.forEach((player, idx) => {
        if (player.username === this.state.username) {
          playersCopy.splice(idx, 1);
          db.collection('rooms').doc(this.state.roomId).update({
            players: playersCopy
          }).then(() => this.setState({ inRoom: false }));

        }
      });
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    return (
      <div id='room-container'>
        <div id='game-container'>
          <div id='game-info'>
            <h2>Host: {this.state.host}</h2>
            <h1>Room: {this.state.roomId}</h1>
            {
              this.state.inRoom ?
                <Button className='leave-join' onClick={this.leaveRoom}>Leave Room</Button>
                :
                <Button className='leave-join' onClick={this.joinRoom}>Join Room!</Button>
            }
          </div>
          <h2>Players: {this.state.players.length}</h2>
          {
            this.state.players.length < 2 &&
            <Segment>
              <h2 className='loading-message'>Waiting for more players...</h2>
              <Loader active />
            </Segment>
          }
        </div>
        <Game state={this.state} />
      </div>
    );
  }
}

export default withAuth(GameRoom);

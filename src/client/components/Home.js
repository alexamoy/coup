import React, { Component } from 'react';
import { withAuth } from 'fireview';
import { Grid, Image, Segment, Button } from 'semantic-ui-react';
import db from '../../firestore';
import court from './deck';
import history from '../../history';

let shuffleCourt = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      profileImg: '',
      wins: 0,
      totalGames: 0,
      userId: ''
    };
    this.createRoom = this.createRoom.bind(this);
  }
  async componentDidMount() {
    try {
      const userId = await this.props.withAuth.auth.currentUser.uid;
      const user = await db.collection('users').doc(userId).get();
      const username = await user.data().username;
      const profileImg = await user.data().profileImg;
      const wins = await user.data().wins;
      const totalGames = await user.data().totalGames;
      this.setState({ username, profileImg, wins, totalGames, userId });
    } catch (err) {
      console.error(err);
    }
  }
  async createRoom() {
    try {
      shuffleCourt(court);
      const room = await db.collection('rooms').add({
        creator: this.state.userId,
        players: [this.state],
        deck: court,
        activeCharacters: 2
      });
      history.push(`/room/${room.id}`);
    } catch(err) {
      console.error(err);
    }
  }
  render() {
    return (
      <div>
        <Grid className='profile-container'>
          <Grid.Column className='profile-column'>
            <h1>OVERVIEW</h1>
            <Segment id='pro-img-name'>
              <Image src={this.state.profileImg} className='profile-img-home' />
              <h1>{this.state.username}</h1>
            </Segment>
            <Grid.Row className='stats'>
              <Grid.Column>
                <Segment className='stats-boxes'>
                  <h2>Total Games Played</h2>
                  <h1>{this.state.totalGames}</h1>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment className='stats-boxes'>
                  <h2>Games Won</h2>
                  <h1>{this.state.wins}</h1>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Button className='start-button' onClick={this.createRoom}>Start New Game</Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default withAuth(Home);

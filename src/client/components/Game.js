import React, { Component } from 'react';
import { withAuth } from 'fireview';
import db from '../../firestore';
import { Grid, Segment } from 'semantic-ui-react';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props.state);
    return (
      <Grid id='grid-container'>
        <Grid.Row id='game-grid'>
          {
            this.props.state.players.map((player, idx) => {
              if (player.username !== this.props.state.username){
                return (
                  <Segment key={idx} className='player-cards'>
                    <h2>{player.username}</h2>
                  </Segment>
                );
              }
            })
          }
        </Grid.Row>
        <Grid.Row id='game-grid'>
          <Segment className='player-cards'>
            <h2>{this.props.state.username}</h2>
          </Segment>
        </Grid.Row>
      </Grid>
    );
  }
}

export default withAuth(Game);

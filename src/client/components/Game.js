import React, { Component } from 'react';
import { withAuth } from 'fireview';
import { Grid, Segment, Button, Image } from 'semantic-ui-react';
import db from '../../firestore';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      court: this.props.game.deck,
      players: [],
      inProgress: false,
      influence: null,
      inventory: 0,
      gameId: ''
    };
  }
  render() {
    return (
      <Grid id='grid-container'>
        <Grid.Row id='game-grid'>
          {
            this.props.game.players.map((player, idx) => {
              if (player.username !== this.props.game.username) {
                return (
                  <Segment key={idx} className='player-cards'>
                    <h2>{player.username}</h2>
                    <div className='cards'>
                      {
                        player.influence &&
                        player.influence.map((character, idx) => (
                          <Image src={character.image} key={idx} />
                        ))
                      }
                    </div>
                  </Segment>
                );
              }
            })
          }
        </Grid.Row>
        {
          this.props.game.players.map((player, idx) => {
            if (player.username === this.props.game.username) {
              return (
                <Grid.Row id='game-grid' key={idx}>
                  <Segment className='player-cards'>
                    <h2>{this.props.game.username}</h2>
                    <div className='cards'>
                      {
                        this.props.game.inProgress &&
                        this.props.game.influence.map((character, idx) => (
                          <Image src={character.image} key={idx} />
                        ))
                      }
                    </div>
                  </Segment>
                </Grid.Row>
              );
            }
          })
        }
      </Grid>
    );
  }
}

export default withAuth(Game);

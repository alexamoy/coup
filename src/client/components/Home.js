import React, { Component } from 'react';
import { withAuth } from 'fireview';
import { Grid } from 'semantic-ui-react';
import db from '../../firestore';

class Home extends Component {
  state = {
    username: ''
  }
  async componentDidMount() {
    try {
      const userId = await this.props.withAuth.auth.currentUser.uid;
      const user = await db.collection('users').doc(userId).get();
      const username = await user.data().username;
      this.setState({username});
    } catch(err) {
      console.error(err)
    }
  }
  render(){
    return(
      <Grid>
        <h1>{this.state.username}'s profile</h1>
      </Grid>
    );
  }
}
export default withAuth(Home);

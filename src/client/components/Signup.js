import React, { Component } from 'react';
import { Form, Grid, Message, Segment } from 'semantic-ui-react';
import firebase from 'firebase';
import db from '../../firestore';
import history from '../../history';

export default class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    profileImg: 'http://tinypic.com/r/2zzng9d/9',
    error: false
  }
  handleChange = event => {
    event.preventDefault();
    const updatedState = {};
    updatedState[event.target.name] = event.target.value;
    this.setState(updatedState);
  }

  handleSignup = async event => {
    event.preventDefault();
    const email = event.target.email.value;
    const username = event.target.username.value;
    const password = event.target.password.value;
    try {
      const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
      db.collection('users').doc(`${newUser.user.uid}`).set({
        email: email,
        username: username,
        profileImg: this.state.profileImg,
        wins: 0,
        forfeits: 0,
        totalGames: 0
      })
      return history.push('/home');
    } catch (err) {
      this.setState({ error: true });
      console.error(err);
    }
  }
  render() {
    return (
      <Grid className='login-container'>
        <Grid.Column style={{ maxWidth: 450 }} >
          <h1 className='login-text'>Sign Up</h1>
          <Form className='login-form' onSubmit={this.handleSignup} error>
            <Segment stacked>
              <Form.Input
                placeholder='Email Address'
                name='email'
                type='text'
                icon='user'
                autoComplete='email'
                onChange={this.handleChange}
              />
              <Form.Input
                placeholder='Username'
                name='username'
                type='text'
                autoComplete='username'
                onChange={this.handleChange}
              />
              <Form.Input
                placeholder='Password'
                name='password'
                type='password'
                icon='lock'
                autoComplete='current-password'
                onChange={this.handleChange}
              />
              {
                this.state.error &&
                <Message
                  error
                  header='Uh-oh Signup Unsuccessful!'
                />
              }
              {
                this.state.password.length < 6 ?
                  <Form.Button disabled type="submit" id='signup-button'>Sign Up</Form.Button>
                  :
                  <Form.Button active type="submit" id='signup-button'>Sign Up</Form.Button>
              }
            </Segment>
          </Form>
          <Message color='grey'>
            Already have an account? <a href='/login'>Login</a>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}


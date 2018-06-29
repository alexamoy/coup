import React, { Component } from 'react';
import { Form, Grid, Message, Segment } from 'semantic-ui-react';
import firebase from 'firebase';
import history from '../../history';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    error: false,
    success: false
  }
  handleChange = event => {
    event.preventDefault();
    const updatedState = {};
    updatedState[event.target.name] = event.target.value;
    this.setState(updatedState);
  }
  handleSubmit = event => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      firebase.auth().signInWithEmailAndPassword(email, password)
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => (
      firebase.auth().signInWithEmailAndPassword(email, password)
      ))
      .then(() => {this.setState({success: true});})
      .then(() => {setTimeout(() => this.setState({ success: false }), 3000);})
      .then(() => history.push('/home'))
    } catch(err) {
      this.setState({ error: true });
    }
  }

  render() {
    return (
      <Grid className='login-container'>
      <Grid.Column style={{ maxWidth: 450 }} >
        <h1 className='login-text'>Log-in</h1>
        <Form className='login-form' onSubmit={this.handleSubmit} error>
          <Segment stacked>
            <Form.Input
              placeholder='Email Address'
              name='email'
              type='text'
              icon='user'
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder='Password'
              name='password'
              type='password'
              icon='lock'
              onChange={this.handleChange}
            />
            {
              this.state.error &&
              <Message
                error
                header='Login Unsuccessful!'
                content='email/password incorrect'
              />
            }
            {
              this.state.password.length < 6 ?
              <Form.Button disabled id="signup-button">Log In</Form.Button>
              :
              <Form.Button active id="signup-button">Log In</Form.Button>
            }
          </Segment>
        </Form>
        <Message color='grey'>
          New to coup? <a href='/signup'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
    )
  }
};


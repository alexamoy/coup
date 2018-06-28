import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

const Login = () => (
  <Grid className='login-container'>
    <Grid.Column style={{ maxWidth: 450 }} >
      <Header as='h1' className='login-text'>
        Log-in
      </Header>
      <Form className='login-form'>
        <Segment stacked>
          <Form.Input
            placeholder='Email Address'
            name='email'
            type='text'
            icon='user'
          />
          <Form.Input
            placeholder='Password'
            name='password'
            type='password'
            icon='lock'
          />
          <Button type='submit' fluid>Login</Button>
        </Segment>
      </Form>
      <Message color='grey'>
        New to coup? <a href='/signup'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
);

export default Login;

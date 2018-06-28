import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

const Signup = () => (
  <Grid className='login-container'>
    <Grid.Column style={{ maxWidth: 450 }} >
      <Header as='h1' className='login-text'>
        Sign Up
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
            placeholder='Username'
            name='username'
            type='text'
          />
          <Form.Input
            placeholder='Password'
            name='password'
            type='password'
            icon='lock'
          />
          <Button type='submit' fluid>Sign Up</Button>
        </Segment>
      </Form>
      <Message color='grey'>
        Already have an account? <a href='/login'>Login</a>
      </Message>
    </Grid.Column>
  </Grid>
);

export default Signup;

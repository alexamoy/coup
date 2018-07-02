import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Login, Signup, Home, GameRoom } from './components';
import { withAuth } from 'fireview';

const Routes = props => {
  const user = props._user;
  return (
    user ?
      (
        <Switch>
          <Route path='/room/:id' component={GameRoom} />
          <Route path='/home' component={Home} />
          <Route exact path='/' component={Home} />
        </Switch>
      )
      :
      (
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route exact path='/' component={Login} />
        </Switch>
      )
  );
};

export default withRouter(withAuth(Routes));

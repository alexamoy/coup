import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Login, Signup } from './components';
import { withAuth } from 'fireview';

const Routes = props => {
  const user = props.user;
  return (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
    </Switch>
  );
};

export default withRouter(withAuth(Routes));

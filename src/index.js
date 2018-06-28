import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router } from 'react-router-dom';
import history from './history';
import { AuthProvider } from 'fireview';
import * as firebase from 'firebase';
import config from './firestore/config';

firebase.initializeApp(config);

ReactDOM.render(
  <AuthProvider auth={firebase.auth()}>
    <Router history={history}>
      <App />
    </Router>
  </AuthProvider>,
  document.getElementById('root'));
registerServiceWorker();



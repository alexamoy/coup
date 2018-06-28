const firebase = require('firebase');
const config = require('./config');
require('firebase/firestore');
require('firebase/auth');

firebase.initializeApp(config);
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export default db;

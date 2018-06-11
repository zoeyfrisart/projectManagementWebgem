import firebase from 'firebase/app';
require('firebase/auth');
require('firebase/database');

const fireApp = firebase.initializeApp({
  apiKey: 'AIzaSyAXqGMb3tuS3_VdlAqjB2cTJPicJGuHc74',
  authDomain: 'project-management-371c6.firebaseapp.com',
  databaseURL: 'https://project-management-371c6.firebaseio.com'
});

export default fireApp;
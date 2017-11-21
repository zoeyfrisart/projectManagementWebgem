import { h, Component } from 'preact';
import { Router } from 'preact-router';
import NotifyChange from 'preact-notify-change';

import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
import Team from '../routes/team';
import Login from '../routes/login';
import Teams from '../routes/Teams';

import firebase from 'firebase/app';
require('firebase/auth');
import fireApp from '../base2';
import Edit from '../routes/edit/index';

const github = new firebase.auth.GithubAuthProvider();
github.addScope('user:email');

const facebook = new firebase.auth.FacebookAuthProvider();
facebook.addScope('user_email');

const twitter = new firebase.auth.TwitterAuthProvider();

export default class App extends Component {
  constructor() {
    super();
    // this.renderInventory = this.renderInventory.bind(this);
    // this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.state = {
      uid: null,
      owner: null,
      username: null,
      userProfilePic: null,
      email: null
    };
  }

  componentDidMount() {
    firebase.auth(fireApp).onAuthStateChanged((user) => {
      if (user) {
        this.authHandler(null, { user });
      }
    });
    // base.onAuth((user) => {
    //   if (user) {
    //     this.authHandler(null, { user });
    //   }
    // });
  }

  handleRoute = e => {
    this.currentUrl = e.url;
  };

  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    firebase.auth(fireApp).signInWithPopup(provider).then(() => {
      this.authHandler;
    });
    // base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    // base.unauth();
    firebase.auth(fireApp).signOut();
    this.setState({ uid: null, username: null, userProfilePic: null, email: null });
  }

  authHandler(err, authData)  {
    console.log(authData);
    if (err) {
      console.error(err);
      return;
    }

    // grab the database info
    const globalRef = fireApp.database().ref('global');

    // query the firebase once for the store data
    globalRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      // claim it as our own if there is no owner already
      if(!data.owner) {
        globalRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid,
        username: authData.user.displayName,
        userProfilePic: authData.user.photoURL,
        email: authData.user.email
      });
    });

  }


  render() {
    return (
      <div id="app">
        <Header
          uid={this.state.uid}
          username={this.state.username}
          userProfilePic={this.state.userProfilePic}
          logout={this.logout}
        />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Profile path="/profile/" user="me" />
          <Profile path="/profile/:user"
            uid={this.state.uid}
            username={this.state.username}
            userProfilePic={this.state.userProfilePic}
            email={this.state.email}
          />
          <Team path="/team/" teamName="test" />
          <Team path="/team/:teamName" uid={this.state.uid} />
          <Team path="/team/:teamName/board/:boardName" uid={this.state.uid} />
          <Login path="/login"
            authenticate={this.authenticate}
            twitter={twitter}
            facebook={facebook}
            github={github}
            uid={this.state.uid}
          />
          <Edit path="/profile/:user/edit"
            uid={this.state.uid}
            username={this.state.username}
            userProfilePic={this.state.userProfilePic}
            email={this.state.email}
          />
          <Teams path="/teams" uuid={this.state.uid} />
        </Router>
        <NotifyChange />
      </div>
    );
  }
}

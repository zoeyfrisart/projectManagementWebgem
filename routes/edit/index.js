import { h, Component } from 'preact';
import style from './style';
import base from '../../base';

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      user: {},
      friends: {}
    };
  }

  componentWillMount(nextProps) {
    this.ref = base.syncState(`users/${this.props.user}`, {
      context: this,
      state: 'user'
    });
    this.ref2 = base.syncState(`users/${this.props.user}/friends`, {
      context: this,
      state: 'friends'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
    base.removeBinding(this.ref2);
  }

  // Function to update User.
  updateUser(updatedUser) {
    let user = { ...this.state.user };
    user = updatedUser;
    this.setState({ user });
  }

  // Function to handle change.
  handleChange(e) {
    const userData = this.state.user;
    const updatedUser = {
      ...userData,
      [e.target.name]: e.target.value
    };
    this.updateUser(updatedUser);
  }

  // Note: `user` comes from the URL, courtesy of our router
  render({ user }) {
    return (
      <div class={style.profile}>
        <div class={style.profileWrap}>
          <div class={style.profileDesc}>
            <div class={style.inputGroup}>
              <input
                class={style.editProfileInput}
                name="name"
                placeholder="Display name"
                value={this.state.user.name}
                onChange={(e) => this.handleChange(e)}
                id="name"
              />
              <label for="name">Display name</label>
            </div>
            <div class={style.inputGroup}>
              <input
                class={style.editProfileInput}
                placeholder="Your function / Title"
                name="functie"
                value={this.state.user.functie}
                onChange={(e) => this.handleChange(e)}
                id="function"
              />
              <label for="function">Your function / Title</label>
            </div>
            <div class={style.inputGroup}>
              <input
                class={style.editProfileInput}
                placeholder="example@example.com"
                name="email"
                value={this.state.user.email}
                onChange={(e) => this.handleChange(e)}
                id="email"
              />
              <label for="email">Your email</label>
            </div>
            <div class={style.inputGroup}>
              <input
                class={style.editProfileInput}
                placeholder="06 xxxx xxxx"
                name="phone"
                value={this.state.user.phone}
                onChange={(e) => this.handleChange(e)}
                id="number"
              />
              <label for="number">Your number</label>
            </div>
            <div class={style.inputGroup}>
              <textarea
                placeholder="Your bio, describe yourself here"
                class={style.editProfileInput}
                onChange={(e) => this.handleChange(e)}
                name="bio"
                rows="8"
                cols="40"
                maxlength="150"
                id="bio"
              >
                {this.state.user.bio}
              </textarea>
              <label for="bio">Your bio</label>
            </div>
          </div>
          <div class={style.profilePicWrap}>
            <img class={style.profilePic} src={this.state.user.profilePic} />
          </div>
        </div>
      </div>
    );
  }
}

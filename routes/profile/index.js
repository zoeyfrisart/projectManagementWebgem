import { h, Component} from 'preact';
import style from './style';
import base from '../../base';

export default class Profile extends Component {
  constructor(props) {
    super(props);

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

  // Note: `user` comes from the URL, courtesy of our router
  render({ user }) {
    return (
      <div class={style.profile}>
        {/* <header class={style.profileHeader} role="banner" /> */}
        <div class={style.profileWrap}>
          <div class={style.profileDesc}>
            <h2 class={style.userName}>{this.state.user.name}</h2>
            <p class={style.subInfoFunctie}>{this.state.user.functie}</p>
            {/* <span class={style.subInfoEmail}>{this.state.user.email}</span> */}
            <blockquote class={style.bio}>{this.state.user.bio}</blockquote>
            <footer class={style.friends}>
              <div>
                <p class={style.friendHead}>friends</p>
                <p class={style.friendsAmount}>{Object.keys(this.state.friends).length}</p>
              </div>
              <div>
                <p class={style.friendHead}>call</p>
                <a class={style.friendsAmount} href={`tel:${this.state.user.phone}`}><i class="material-icons">phone</i></a>
              </div>
              <div>
                <p class={style.friendHead}>mail</p>
                <a class={style.friendsAmount} href={`mailto:${this.state.user.email}`}><i class="material-icons">email</i></a>
              </div>
            </footer>
          </div>
          <div class={style.profilePicWrap}>
            <img class={style.profilePic} src={this.state.user.profilePic} />
          </div>
        </div>
      </div>
    );
  }
}

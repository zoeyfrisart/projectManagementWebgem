import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

import logo from '../../assets/img/logo.svg';
import UserMenu from '../user/index';

export default class Header extends Component {
  constructor() {
    super();
    this.renderLoggedInNav = this.renderLoggedInNav.bind(this);
  }

  renderLoggedInNav() {
    return (
      <div class={style.headWrap}>
        <Link class={style.logo} aria-label="start page" href="/"><img src={logo} alt={logo} /></Link>
        <nav>
          <Link href="/teams">my teams</Link>
          <UserMenu
            username={this.props.username}
            userProfilePic={this.props.userProfilePic}
            logout={this.props.logout}
            uid={this.props.uid}
          />
        </nav>
      </div>
    );
  }
  render() {
    if (this.props.uid !== null) {
      return <header class={style.header}>{this.renderLoggedInNav()}</header>;
    }

    return (
      <header class={style.header}>
        <div class={style.headWrap}>
          <nav>
            <Link activeClassName={style.active} href="/">start</Link>
            <Link activeClassName={style.active} href="/login">login</Link>
          </nav>
        </div>
      </header>
    );
  }
}

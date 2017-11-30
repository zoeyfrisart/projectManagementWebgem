import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

import logo from '../../assets/img/logo.svg';
import UserMenu from '../user/index';

export default class Header extends Component {
  constructor() {
    super();
    this.renderLoggedInNav = this.renderLoggedInNav.bind(this);
    this.getUrl = this.getUrl.bind(this);
  }

  getUrl() {
    if (!this.props.toSpecial && this.props.to) {
      const curUrl = this.props.to;
      const length = this.props.routLength - 2;
      const strippedUrl = curUrl.splice(0, length);
      const newUrl = strippedUrl.join('/');
      return newUrl;
    }
    else {
      return this.props.toSpecial;
    }
  }

  renderLoggedInNav() {
    return (
      <div class={style.headWrap}>
        <Link class={style.logo} aria-label="start page" href="/"><img src={logo} alt={logo} /></Link>
        <nav>
          <Link class={style.backArrow} href={this.getUrl()}><i class="material-icons" style={this.props.hidden}>keyboard_arrow_left</i></Link>
          <span>{this.props.title}</span>
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
            <Link class={style.backArrow} href={this.getUrl()}><i class="material-icons" style={this.props.hidden}>keyboard_arrow_left</i></Link>
            <span>{this.props.title}</span>
            <Link activeClassName={style.active} href="/login">login</Link>
          </nav>
        </div>
      </header>
    );
  }
}

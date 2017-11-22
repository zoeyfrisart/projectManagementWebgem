import { h, Component } from 'preact';
import Menu from 'preact-material-components/Menu';
import Button from 'preact-material-components/Button';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Menu/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import { Router } from 'preact-router';
import { Link } from 'preact-router';

export default class UserMenu extends Component {

  render() {
    return (
      <a style={`padding: 0;`}>
        <Menu.Anchor>
          <Button
            onClick={e => {
              if (this.menu.MDComponent.open !== true){
                this.menu.MDComponent.open = true;
              } else {
                this.menu.MDComponent.open = false;
              }
            }}
            style={`width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;`}
          >
            <img style={`border-radius: 50%;`} src={this.props.userProfilePic} height="30" alt={`profilepicture of ${this.props.username}`} />
          </Button>
          <Menu
            ref={menu => {
              this.menu = menu;
            }}
            open-from-top-right
            class={style.boooooi}
          >
            <Link class={style.link} href={`/profile/${this.props.uid}`}>
              <i className="material-icons">account_circle</i>
              <p>profile</p>
            </Link>
            <Link class={style.link} href={`/profile/${this.props.uid}/edit`}>
              <i className="material-icons">mode_edit</i>
              <p>edit profile</p>
            </Link>
            <Link class={style.link} href={`/`}>
              <i className="material-icons">group_add</i>
              <p>add to team</p>
            </Link>
            <li role="separator" class="mdc-list-divider"></li>
            <Link class={style.link} href={`/settings`}>
              <i className="material-icons">settings</i>
              <p>settings</p>
            </Link>
            <Menu.Item onclick={this.props.logout}>
              <i className="material-icons">close</i>
              <p>logout</p>
            </Menu.Item>
          </Menu>
        </Menu.Anchor>
      </a>
    );
  }
}
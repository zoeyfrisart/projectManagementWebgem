import { h, Component } from 'preact';
import Menu from 'preact-material-components/Menu';
import Button from 'preact-material-components/Button';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Menu/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

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
            <Menu.Item>
              <i className="material-icons">account_circle</i>
              <p>profile</p>
            </Menu.Item>
            <Menu.Item>
              <i className="material-icons">account_circle</i>
              <p>edit profile</p>
            </Menu.Item>
            <Menu.Item>
              <i className="material-icons">account_circle</i>
              <p>teams</p>
            </Menu.Item>
            <li role="separator" class="mdc-list-divider"></li>
            <Menu.Item>
              <i className="material-icons">account_circle</i>
              <p>settings</p>
            </Menu.Item>
            <Menu.Item onclick={this.props.logout}>
              <i className="material-icons">account_circle</i>
              <p>logout</p>
            </Menu.Item>
          </Menu>
        </Menu.Anchor>
      </a>
    );
  }
}
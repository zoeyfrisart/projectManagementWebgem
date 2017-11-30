import { h, Component } from 'preact';
import style from './style';
import { Link } from 'preact-router';

export default class NewMobileGroup extends Component {

  render() {
    const i = this.props;
    return (
      <div class={style.createGroup}>
        <Link>Create group <i class="material-icons">keyboard_arrow_right</i></Link>
      </div>
    );
  }
}
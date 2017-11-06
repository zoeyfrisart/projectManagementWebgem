import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Home extends Component {
  render() {
    return (
      <div class={style.home}>
        <h1>Home</h1>
        <p>This is the Home component.</p>
        <Link href="/team/webgem">go to Webgem</Link>
      </div>
    );
  }
}

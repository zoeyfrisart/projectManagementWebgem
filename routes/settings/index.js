import { h, Component } from 'preact';
import style from './style';
import base from '../../base';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: {}
    };
  }

  componentWillMount(nextProps) {
    this.ref = base.syncState(`users/${this.props.uid}/settings`, {
      context: this,
      state: 'settings'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
    base.removeBinding(this.ref2);
  }

  render() {
    return (
      <div class={style.settings}>
        <div class={style.settingsWrap}>
          <h1>Settings</h1>

        </div>
      </div>
    );
  }
}
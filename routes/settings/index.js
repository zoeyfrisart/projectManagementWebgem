import { h, Component } from 'preact';
import { Router } from 'preact-router';
import linkState from 'linkstate';
import style from './style';
import base from '../../base';
import Header from '../../components/header';
import { BlockPicker } from 'react-color';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: {}
    };
  }

  componentWillMount(nextProps) {
    this.ref = base.syncState(`users/${this.props.user}/settings`, {
      context: this,
      state: 'settings'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    return (
      <div class={style.settings}>
        <Header
          uid={this.props.uid}
          username={this.props.username}
          userProfilePic={this.props.userProfilePic}
          logout={this.props.logout}
          to={Router.getCurrentUrl().split('/')}
          toSpecial={this.props.toSpecial}
          routLength={Router.getCurrentUrl().split('/').length}
          hidden={this.props.hidden}
          title={this.props.title}
        />
        <div class={style.settingsWrap}>
          <h1>Settings</h1>
          <label for="opacity">Opacity: {this.state.settings.opacity}</label>
          <input
            value={this.state.settings.opacity}
            id="opacity"
            type="range"
            min="0.1"
            max="1"
            step="0.10"
            onChange={linkState(this, 'settings.opacity')}
          />
          <label for="fontWeight">Font weight: {this.state.settings.fontWeight}</label>
          <input
            value={this.state.settings.fontWeight}
            id="fontWeight"
            type="range"
            min="300"
            max="400"
            step="100"
            onChange={linkState(this, 'settings.fontWeight')}
          />
          <label for="fontSize">Font size: {this.state.settings.fontSize}px</label>
          <input
            value={this.state.settings.fontSize}
            id="fontSize"
            type="range"
            min="12"
            max="18"
            step="1"
            onChange={linkState(this, 'settings.fontSize')}
          />
          <label class={style.switch}>
            <input type="checkbox" checked={this.state.settings.style ? 'checked' : null} onChange={linkState(this, 'settings.style')} />
            <span class={[style.slider, style.round].join(' ')} />
          </label>
          <BlockPicker
            width="200px"
            triangle="hide"
            color={this.state.settings.color}
            onChange={linkState(this, 'settings.color', 'hex')}
            colors={['#000000', '#697689', '#596496', '#333333', '#493b6e']}
          />
        </div>
      </div>
    );
  }
}
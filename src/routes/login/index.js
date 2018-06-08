import { h, Component } from 'preact';
import Redirect from '../../components/Redirect';
import style from './style';

import webgemLogo from '../../assets/img/logo_webgem.svg';

export default class Login extends Component {
  renderLogin() {
    return (
      <div class={style.loginWrap}>
        <div class={style.login}>
          <div class={style.signup}>
            <div class={style.backgroundGradient} />
            <div class={style.logoWrap}>
              <span class={style.lineSub} />
              <span class={style.lineMain} />
              <img src={webgemLogo} alt="logo webgem" class={style.logoImg} />
              <span class={style.lineMain} />
              <span class={style.lineSub} />
            </div>
          </div>
          <div class={style.loginhalf}>
            <h2 class={style.loginHalfH2}>Login</h2>
            <span class={style.lineLogin} />
            {/* <form class={style.loginForm}>
              <div class={style.inputWrap}>
                <label for="email">✉️</label>
                <input required placeholder="Email" name="email" id="email" />
              </div>
              <div class={style.inputWrap}>
                <label for="password">🔒</label>
                <input required type="password" placeholder="Password" name="password" id="password" />
              </div>
              <button class={style.loginSubmit}>login</button>
            </form> */}
            <div class={style.loginWith}>
              <button class={style.loginBut} onClick={() => this.props.authenticate(this.props.github)}>login with github</button>
              <button class={style.loginBut} onClick={() => this.props.authenticate(this.props.facebook)} >login with facebook</button>
              <button class={style.loginBut} onClick={() => this.props.authenticate(this.props.twitter)} >login with twitter</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    if (!this.props.uid) {
      return <div>{this.renderLogin()}</div>;
    }
    return (
      <Redirect to="/teams" />
    );
  }
}
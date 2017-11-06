import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import userMenu from '../user';
import style from './style';

import logo from '../../assets/img/logo.svg';
import UserMenu from '../user/index';

export default class StatusComp extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>hallo</h1>
      </div>
    );
  }
}

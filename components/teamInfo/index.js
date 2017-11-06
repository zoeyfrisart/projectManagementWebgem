import { h, Component } from 'preact';
import BoardCard from '../boardcard';

import style from './style';

export default class TeamInfo extends Component {
  render() {
    return (
      <div class={style.team}>
        <div class={style.content}>
          <div class={style.headWrap}><h2>{this.props.teamname}</h2></div>
          {
            Object
              .keys(this.props.boards)
              .map(key => <BoardCard boardname={this.props.boards[key]} teamname={this.props.teamname} key={key} index={key} />)
          }
        </div>
      </div>
    );
  }
}

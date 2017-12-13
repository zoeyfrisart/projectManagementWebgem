import { h, Component } from 'preact';
import style from './style';
import { Link } from 'preact-router';
import { getColor } from '../../helpers';

export default class MobileItem extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     borderColor: 'rgba(0,200,117,0.9)'
  //   };
  // }


  render() {
    const i = this.props;
    return (
      <li class={style.task} style={`--borderColor: ${getColor(i.details.status)};`}>
        <Link href={`/team/${i.teamname}/board/${i.boardname}/${i.groupname}/${i.index}`} >{i.details.desc}<i class="material-icons">keyboard_arrow_right</i></Link>
      </li>
    );
  }
}
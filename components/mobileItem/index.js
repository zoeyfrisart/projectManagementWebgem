import { h, Component } from 'preact';
import style from './style';
import { Link } from 'preact-router';

function getColor(newValue) {
  if (newValue === 'Done') {
    return '#00c875';
  }
  else if (newValue === 'Ready for testing') {
    return '#0086c0';
  }
  else if (newValue === 'Working on it') {
    return '#fdab3d';
  }
  else if (newValue === 'Work needed (rejected)') {
    return '#a25ddc';
  }
  else if (newValue === `Need help (I'm stuck)`) {
    return '#e2445c';
  }
  else if (newValue === 'To do') {
    return '#c4c4c4'
  }
  else if (newValue === 'Cancelled') {
    return '#a00037'
  }
}

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
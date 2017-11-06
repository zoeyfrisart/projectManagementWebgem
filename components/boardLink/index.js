import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import '@material/list/dist/mdc.list.min.css';
import style from './style';

export default class BoardLink extends Component {
  constructor() {
    super();

    this.areYouFuckingSure = this.areYouFuckingSure.bind(this);
  }

  state = {
    deletedBoard: 'boooooooi'
  }

  areYouFuckingSure() {
    let r = confirm(`You are about to delete ${this.props.details.name}. \nThis can't be undone! \nAre you sure you want to delete the board ${this.props.details.name}`);
    if (r === true) {
      this.props.removeBoard(this.props.index);
    }
  }

  render() {
    const i = this.props;
    return (
      <li className="mdc-list-item">
        <Link activeClassName={style.activeBoard} href={`/team/${i.teamName}/board/${i.index}`} >
          {i.details.name}
        </Link>
        <a onClick={this.areYouFuckingSure} className="mdc-list-item__end-detail material-icons" aria-label="Delete Board" title="Delete board">
          delete
        </a>
      </li>
    );
  }
}
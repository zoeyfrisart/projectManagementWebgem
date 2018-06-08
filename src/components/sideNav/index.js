import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import '@material/list/dist/mdc.list.min.css';

import BoardLink from '../boardLink';
import NewBoard from '../newBoard';

export default class Sidenav extends Component {
  constructor() {
    super();
    this.renderWarning = this.renderWarning.bind(this);
  }

  renderWarning(teamName, addBoard) {
    return (
      <header class={style.sidebar}>
        <nav>
          <Link activeClassName={style.activeBoard} href={`/team/${teamName}`} >overview</Link>
          <div class={style.boardLinkWrapper}>
            <h3 class={style.boardLinkHeader}>Boards</h3>
            <ul className="mdc-list" style={`padding: 0;`}>
              {
                Object
                  .keys(this.props.boards)
                  .map(key => <BoardLink key={key} index={key} removeBoard={this.props.removeBoard} details={this.props.boards[key]} teamName={teamName} />)
              }
            </ul>
            <NewBoard addBoard={this.props.addBoard} />
          </div>
        </nav>
        <div class={style.warningPerm}>
          <p>Warning, you don't have the required permissions to edit this board. <br />Any changes you make will be lost.</p>
        </div>
      </header>
    );
  }

  render({ teamName }, { addBoard }) {
    if (this.props.members[`${this.props.uid}`] !== true) {
      return <header class={style.sidebar}>{this.renderWarning(teamName, addBoard)}</header>;
    }
    return (
      <header class={style.sidebar}>
        <nav>
          <Link activeClassName={style.activeBoard} href={`/team/${teamName}`} >overview</Link>
          <div class={style.boardLinkWrapper}>
            <h3 class={style.boardLinkHeader}>Boards</h3>
            <ul className="mdc-list" style={`padding: 0;`}>
              {
                Object
                  .keys(this.props.boards)
                  .map(key => <BoardLink key={key} index={key} removeBoard={this.props.removeBoard} details={this.props.boards[key]} teamName={teamName} />)
              }
            </ul>
            <NewBoard addBoard={this.props.addBoard} />
          </div>
        </nav>
      </header>
    );
  }
}

Sidenav.propTypes = {
  addBoard: Component.PropTypes.func.isRequired
};
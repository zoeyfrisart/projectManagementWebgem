import { h, Component } from 'preact';
import style from './style';
import Sidenav from '../../components/sideNav';

import base from '../../base';
import { Router, route } from 'preact-router';
import Board from '../board/index';
import TeamInfo from '../../components/teamInfo/index';
import ItemOverview from '../itemOverview/index';
import EditItem from '../editItem/index';
import Header from '../../components/header/index';
import CreateTask from '../createTask/index';
// import BoardLink from '../../components/boardLink/index';
// import {PropTypes} from 'preact-compat';

export default class Team extends Component {
  constructor() {
    super();
    this.addBoard = this.addBoard.bind(this);
    this.removeBoard = this.removeBoard.bind(this);
  }

  state = {
    boards: {},
    members: {},
    key: '032412'
  }

  componentWillMount(nextProps) {
    this.ref = base.syncState(`teams/${this.props.teamName}/boards`, {
      context: this,
      state: 'boards'
    });
    this.ref2 = base.syncState(`teams/${this.props.teamName}/members`, {
      context: this,
      state: 'members'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
    base.removeBinding(this.ref2);
  }

  handleRoute = e => {
    this.setState({ key: Math.random() });
    this.currentUrl = e.url;
  };

  addBoard(board) {
    // update our state
    const boards = { ...this.state.boards };
    // add in our new fish
    const timestamp = Date.now();
    boards[`board-${timestamp}`] = board;
    // set state
    this.setState({ boards });
  }

  removeBoard = (key) => {
    const boards = { ...this.state.boards };
    base.fetch(`groups/${key}/`, {
      context: this,
      then(data) {
        Object
          .keys(data)
          .map(key => base.remove(`/items/${key}`));
        base.remove(`groups/${key}`);
      }
    });
    boards[key] = null;
    this.setState({ boards });
    route(`/team/${this.props.teamName}/`, true);
  };

  render({ teamName }, { boards, members, user }) {
    return (
      <div class={style.team}>
        <Header
          uid={this.props.uid}
          username={this.props.username}
          userProfilePic={this.props.userProfilePic}
          logout={this.props.logout}
          to={Router.getCurrentUrl().split("/")}
          toSpecial={this.props.toSpecial}
          routLength={Router.getCurrentUrl().split("/").length}
          hidden={this.props.hidden}
          title={this.props.title}
        />
        <div class={style.hiddenSide} />
        <Sidenav
          addBoard={this.addBoard}
          removeBoard={this.removeBoard}
          boards={this.state.boards}
          teamName={this.props.teamName}
          uid={this.props.uid}
          members={this.state.members}
        />
        <Router onChange={this.handleRoute}>
          <TeamInfo exactly path="/team/:teamname" members={this.state.members} boards={this.state.boards} />
          <Board key={this.state.key} excactly path="/team/:teamname/board/:boardName" members={this.state.members} />
          <ItemOverview excactly path="/team/:teamname/board/:boardName/:groupIndex/:itemIndex" uid={this.props.uid} members={this.state.members}/>
          <EditItem excactly path="/team/:teamname/board/:boardName/:groupIndex/:itemIndex/edit" uid={this.props.uid} members={this.state.members} />
          <CreateTask excactly path="/team/:teamname/board/:boardName/:groupIndex/create" uid={this.props.uid} members={this.state.members} />
        </Router>
      </div>
    );
  }
}
// , {boards, members, user}

import { h, Component } from 'preact';
import style from './style';

import BoardGroup from '../../components/groups';
import NewGroup from '../../components/newGroup';
import StatusComp from '../../components/statusComp';
import base from '../../base';

export default class Board extends Component {
  constructor() {
    super();
    this.addGroup = this.addGroup.bind(this);
    this.updateGroup = this.updateGroup.bind(this);
    this.removeGroup = this.removeGroup.bind(this);
    this.state = {
      groups: {}
    };
  }


  componentWillMount(nextProps) {
    this.ref = base.syncState(`/groups/${this.props.boardName}`, {
      context: this,
      state: 'groups'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addGroup(group) {
    // update our state
    const groups = { ...this.state.groups };
    // add in our new group
    const timestamp = Date.now();
    groups[`group_${timestamp}`] = group;
    // set state
    this.setState({ groups });
  }

  updateGroup(key, updatedGroup) {
    const groups = { ...this.state.groups };
    groups[key] = updatedGroup;
    this.setState({ groups });
  }

  removeGroup = (key) => {
    const groups = { ...this.state.groups };
    groups[key] = null;
    this.setState({ groups });
  };

  render({ teamname }, { boards, members, user }) {
    return (
      <div class={style.board}>
        <StatusComp
          boardName={this.props.boardName}
          teamname={this.props.teamname}
        />
        <div class={style.boardGroupWrapper}>
          {
            Object
              .keys(this.state.groups)
              .map(key => <BoardGroup key={key} index={key} details={this.state.groups[key]} teamname={teamname} boardName={this.props.boardName} addGroup={this.addGroup} updateGroup={this.updateGroup} removeGroup={this.removeGroup} members={this.props.members} />)
          }
          <NewGroup
            addGroup={this.addGroup}
            teamname={teamname}
            boardName={this.props.boardName}
          />
          {/* <BoardGroup details={this.state.groups} /> */}
        </div>
      </div>
    );
  }
}

// , {boards, members, user}

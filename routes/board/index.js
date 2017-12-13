import { h, Component } from 'preact';
import style from './style';

import { Link } from 'preact-router';
import BoardGroup from '../../components/groups';
import NewGroup from '../../components/newGroup';
import StatusComp from '../../components/statusComp';
import base from '../../base';
import MediaQuery from 'react-responsive';

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
        <MediaQuery query="(min-width: 561px)">
          <StatusComp
            boardName={this.props.boardName}
            teamname={this.props.teamname}
          />
        </MediaQuery>
        <div class={style.boardGroupWrapper}>
          {
            Object
              .keys(this.state.groups)
              .map(key => <BoardGroup key={key} index={key} details={this.state.groups[key]} teamname={teamname} boardName={this.props.boardName} addGroup={this.addGroup} updateGroup={this.updateGroup} uid={this.props.uid} removeGroup={this.removeGroup} members={this.props.members} />)
          }
          <MediaQuery query="(min-width: 561px)">
            <NewGroup
              addGroup={this.addGroup}
              teamname={teamname}
              boardName={this.props.boardName}
            />
          </MediaQuery>
          <MediaQuery query="(max-width: 560px)">
            <div class={style.createGroup}>
              <Link href={`/team/${this.props.teamname}/board/${this.props.boardName}/create-group`} >Create group <i class="material-icons">keyboard_arrow_right</i></Link>
            </div>
          </MediaQuery>
        </div>
      </div>
    );
  }
}

// , {boards, members, user}

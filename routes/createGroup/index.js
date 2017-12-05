import { h, Component } from 'preact';
import style from './style';
import { Link, route } from 'preact-router';
import base from '../../base';
import { BlockPicker } from 'react-color';

export default class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.createGroup = this.createGroup.bind(this);

    this.state = {
      groups: {},
      displayColorPicker: false,
      color: '#f47373'
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
    // add in our new Task
    const timestamp = Date.now();
    groups[`group_${timestamp}`] = group;
    // set state
    this.setState({ groups });
    route(`/team/${this.props.teamname}/board/${this.props.boardName}`, true);
  }

  createGroup(event) {
    event.preventDefault();
    const group = {
      name: this.name.value,
      color: this.state.color
    };
    this.addGroup(group);
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    this.setState({ color: color.hex });
    this.setState({ displayColorPicker: false });
  };

  render() {
    return (
      <div class={style.newGroup}>
        <form ref={input => (this.addGroupForm = input)} class={style.newGroupForm} onSubmit={(e) => this.createGroup(e)}>
          <label for="groupname">Group name</label>
          <input id="groupname" required ref={input => (this.name = input)} type="text" placeholder="Name of the new group" />
          <span class={style.groupColorLabel}>Group color</span>
          <div class={style.wrapColor}>
            <div class={style.swatch} onClick={this.handleClick} >
              <div class={style.color} style={`--selectedColor: ${this.state.color}`}>
                Select group color
              </div>
            </div>
            {this.state.displayColorPicker ? <div class={style.popover}>
              <div class={style.cover} onClick={this.handleClose} />
              <BlockPicker
                width="auto"
                triangle="hide"
                color={this.state.color}
                colors={['#F47373', '#697689', '#37D67A', '#2CCCE4', '#ff8a65', '#ba68c8' ,'#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#EF79EC', '#009688', '#4caf50', '#ffc107']}
                onChange={this.handleChange}
                />
            </div> : null}
          </div>
          <input type="submit" value="Create group" class={style.createSubmit} />
          <Link href={`/team/${this.props.teamname}/board/${this.props.boardName}`} class={style.cancel} >Cancel</Link>
        </form>
      </div>
    );
  }
}

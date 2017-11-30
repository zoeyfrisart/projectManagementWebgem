import { h, Component } from 'preact';
import style from './style';
import { Link, route } from 'preact-router';
import base from '../../base';
import moment from 'moment';

// import BoardGroup from '../../components/groups';
// import NewGroup from '../../components/newGroup';
// import NewMobileGroup from '../../components/newGroupMobile';
// import StatusComp from '../../components/statusComp';
// import base from '../../base';
// import MediaQuery from 'react-responsive';

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

function getImgSrc(personName) {
  if (personName === 'Yannick Frisart') {
    return 'https://20578.tk/board/user-profilepics/yannick.png';
  }
  else if (personName === 'Thijs van Rijn') {
    return 'https://20578.tk/board/user-profilepics/thijs.png';
  }
  else if (personName === 'Rick Woltheus') {
    return 'https://20578.tk/board/user-profilepics/rick.png';
  }
  else if (personName === 'Coen Filipsen') {
    return 'https://20578.tk/board/user-profilepics/coen.png';
  }
  else if (personName === 'Maurice') {
    return 'https://20578.tk/board/user-profilepics/maurice.png';
  }
  else if (personName === 'Patrick') {
    return 'https://20578.tk/board/user-profilepics/patrick.png';
  }
  return 'https://20578.tk/board/user-profilepics/none.png';
}

export default class ItemOverview extends Component {
  constructor(props) {
    super(props);

    this.formatDate = this.formatDate.bind(this);
    this.checkIfAssigned = this.checkIfAssigned.bind(this);
    this.isMember = this.isMember.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);

    this.state = {
      item: {},
      imgProfilePic: '',
      members: {}
    };
  }

  componentWillMount(nextProps) {
    this.ref = base.syncState(`items/${this.props.groupIndex}/${this.props.itemIndex}`, {
      context: this,
      state: 'item'
    });
    base.fetch(`teams/${this.props.teamname}/members`, {
      context: this,
      asArray: false,
      then(data) {
        this.setState({
          members: data
        });
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  formatDate(date) {
    let formattedDate = moment(date, 'DD/MM/YY').format("MMMM D, YYYY");
    if (formattedDate == 'Invalid date') {
      return date;
    } else {
      return formattedDate;
    }
  }

  checkIfAssigned(personI) {
    if (personI == 'none') {
      return false;
    } else {
      return <img src={getImgSrc(personI)} alt="Assigned person profile pic" />;
    }
  }

  isMember() {
    const members = { ...this.state.members };
    if (members[this.props.uid] === true) {
      return 'inline-block';
    } else {
      return 'none';
    }
  }

  handleDeleteTask() {
    let r = confirm(`You are about to delete ${this.state.item.desc}. \nThis can't be undone! \nAre you sure you want to delete the task ${this.state.item.desc}`);
    if (r === true) {
      base.remove(`items/${this.props.groupIndex}/${this.props.itemIndex}`);
      route(`/team/${this.props.teamname}/board/${this.props.boardName}/`, true);
    }
  }

  render() {
    return (
      <div class={style.itemOverview}>
        <div class={style.desc}>
          <span>Description</span>
          <p>{this.state.item.desc}</p>
        </div>
        <div class={style.assigned}>
          <span>assigned</span>
          <section>
            {this.checkIfAssigned(this.state.item.p1)}
            {this.checkIfAssigned(this.state.item.p2)}
            {this.checkIfAssigned(this.state.item.p3)}
            {this.checkIfAssigned(this.state.item.p4)}
          </section>
        </div>
        <div class={style.status}>
          <span>Status</span>
          <p style={`--statusColor: ${getColor(this.state.item.status)}`}>{this.state.item.status}</p>
          {/* <p style={`--statusColor: blue;`}>Done</p> */}
        </div>
        <div class={style.timeField}>
          <span>Goal</span>
          <p>{this.formatDate(this.state.item.finishGoal)}</p>
          {/* <p>November 19, 2017</p> */}
        </div>
        <div class={style.deadline}>
          <span>Deadline</span>
          <p>{this.formatDate(this.state.item.deadline)}</p>
          {/* <p>November 21, 2017</p> */}
        </div>
        <div class={style.timeUsed}>
          <span>Time used</span>
          <p>{this.state.item.tooktime} hours</p>
        </div>
        <div class={style.notes}>
          <span>Notes</span>
          <p>
            {this.state.item.notes}
          </p>
        </div>
        <Link style={`display: ${this.isMember()}`} class={style.edit} href={`/team/${this.props.teamname}/board/${this.props.boardName}/${this.props.groupIndex}/${this.props.itemIndex}/edit`}>Edit task</Link>
        <a onClick={this.handleDeleteTask} style={`display: ${this.isMember()}`} class={style.remove}>Delete task</a>
      </div>
    );
  }
}

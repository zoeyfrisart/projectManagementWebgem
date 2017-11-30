import { h, Component } from 'preact';
import style from './style';
import { Link, route } from 'preact-router';
import base from '../../base';

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

export default class EditItem extends Component {
  constructor(props) {
    super(props);

    this.checkIfAssigned = this.checkIfAssigned.bind(this);
    this.toggleMore = this.toggleMore.bind(this);
    this.isOpen = this.isOpen.bind(this);
    this.isOpenBut = this.isOpenBut.bind(this);
    this.updateTask = this.updateTask.bind(this);

    this.state = {
      item: {},
      open: false,
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

  checkIfAssigned(personI) {
    if (personI == 'none') {
      return false;
    } else {
      return <img src={getImgSrc(personI)} alt="Assigned person profile pic" />;
    }
  }

  toggleMore() {
    if (this.state.open) {
      this.setState({
        open: false
      });
    } else {
      this.setState({
        open: true
      });
    }
  }

  isOpen() {
    if (this.state.open == false) {
      return '0';
    } else {
      return '300px';
    }
  }

  isOpenBut() {
    if (this.state.open) {
      return 'expand_less';
    } else {
      return 'expand_more';
    }
  }

  updateTask(event) {
    event.preventDefault();
    const item = { ...this.state.item };
    item['desc'] = this.desc.value;
    item['p1'] = this.person1.value;
    item['p2'] = this.person2.value;
    item['p3'] = this.person3.value;
    item['p4'] = this.person4.value;
    item['status'] = this.status.value;
    item['finishGoal'] = this.goal.value;
    item['deadline'] = this.deadline.value;
    item['tooktime'] = this.tooktime.value;
    item['notes'] = this.notes.value;
    this.setState({ item });
    route(`/team/${this.props.teamname}/board/${this.props.boardName}/${this.props.groupIndex}/${this.props.itemIndex}`, true);
  }

  render() {
    const members = { ...this.state.members };
    if (members[this.props.uid] !== true) {
      return (
        <div class={style.noPerm}>
          <h2>No acces</h2>
          <p>You don't have the needed permission to edit this task. Are you sure you are signed in to the right account?</p>
          <Link href={`/team/${this.props.teamname}/board/${this.props.boardName}/${this.props.groupIndex}/${this.props.itemIndex}`}>Go back</Link>
        </div>
      )
    }
    return (
      <div class={style.itemOverview}>
        <div class={style.desc}>
          <span>Description</span>
          <textarea
            name="desc"
            ref={(input) => this.desc = input}
            placeholder="This is a example description (Click to edit)"
          >
            {this.state.item.desc}
          </textarea>
        </div>
        <div class={style.assigned}>
          <span>assigned</span>
          <section>
            {this.checkIfAssigned(this.state.item.p1)}
            {this.checkIfAssigned(this.state.item.p2)}
            {this.checkIfAssigned(this.state.item.p3)}
            {this.checkIfAssigned(this.state.item.p4)}
            <i class="material-icons" onclick={() => this.toggleMore()}>{this.isOpenBut()}</i>
          </section>
          <section class={style.assignPeople} style={`max-height: ${this.isOpen()};`}>
            <label>Main person</label>
            <select
              ref={(input) => this.person1 = input}
              value={this.state.item.p1}
            >
              <option selected value="none">None</option>
              <option value="Yannick Frisart">Yannick Frisart</option>
              <option value="Thijs van Rijn">Thijs van Rijn</option>
              <option value="Rick Woltheus">Rick Woltheus</option>
              <option value="Coen Filipsen">Coen Filipsen</option>
              <option value="Maurice">Maurice</option>
              <option value="Patrick">Patrick</option>
            </select>
            <label>2e person</label>
            <select
              ref={(input) => this.person2 = input}
              value={this.state.item.p2}
            >
              <option selected value="none">None</option>
              <option value="Yannick Frisart">Yannick Frisart</option>
              <option value="Thijs van Rijn">Thijs van Rijn</option>
              <option value="Rick Woltheus">Rick Woltheus</option>
              <option value="Coen Filipsen">Coen Filipsen</option>
              <option value="Maurice">Maurice</option>
              <option value="Patrick">Patrick</option>
            </select>
            <label>3e person</label>
            <select
              value={this.state.item.p3}
              ref={(input) => this.person3 = input}
            >
              <option selected value="none">None</option>
              <option value="Yannick Frisart">Yannick Frisart</option>
              <option value="Thijs van Rijn">Thijs van Rijn</option>
              <option value="Rick Woltheus">Rick Woltheus</option>
              <option value="Coen Filipsen">Coen Filipsen</option>
              <option value="Maurice">Maurice</option>
              <option value="Patrick">Patrick</option>
            </select>
            <label>4e person</label>
            <select
              value={this.state.item.p4}
              ref={(input) => this.person4 = input}
            >
              <option selected value="none">None</option>
              <option value="Yannick Frisart">Yannick Frisart</option>
              <option value="Thijs van Rijn">Thijs van Rijn</option>
              <option value="Rick Woltheus">Rick Woltheus</option>
              <option value="Coen Filipsen">Coen Filipsen</option>
              <option value="Maurice">Maurice</option>
              <option value="Patrick">Patrick</option>
            </select>
          </section>
        </div>
        <div class={style.status}>
          <span>Status</span>
          <select
            value={this.state.item.status}
            ref={(input) => this.status = input}
          >
            <option value="Done">Done</option>
            <option value="Ready for testing">Ready for testing</option>
            <option value="Working on it">Working on it</option>
            <option value="Work needed (rejected)">Work needed (rejected)</option>
            <option value="Need help (I'm stuck)">Need help (I'm stuck)</option>
            <option value="To do" selected>To do</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div class={style.timeField}>
          <span>Goal</span>
          <input
            type="text"
            ref={(input) => this.goal = input}
            value={this.state.item.finishGoal}
            placeholder="dd/mm/yy"
          />
        </div>
        <div class={style.deadline}>
          <span>Deadline</span>
          <input
            type="text"
            ref={(input) => this.deadline = input}
            value={this.state.item.deadline}
            placeholder="dd/mm/yy"
          />
        </div>
        <div class={style.timeUsed}>
          <span>Time used</span>
          <input
            type="number"
            ref={(input) => this.tooktime = input}
            value={this.state.item.tooktime}
            placeholder="xx"
            min="0"
            max="999"
            maxlength="3"
          />
          <p>hours</p>
        </div>
        <div class={style.notes}>
          <span>Notes</span>
          <textarea
            name="notes"
            placeholder="Task notes"
            ref={(input) => this.notes = input}
          >
            {this.state.item.notes}
          </textarea>
        </div>
        <a onclick={(e) => this.updateTask(e)} class={style.edit}>Finish editing</a>
        <Link class={style.remove} href={`/team/${this.props.teamname}/board/${this.props.boardName}/${this.props.groupIndex}/${this.props.itemIndex}`}>Cancel</Link>
      </div>
    );
  }
}

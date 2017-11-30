import { h, Component } from 'preact';
import style from './style';
import { Link, route } from 'preact-router';
import base from '../../base';

export default class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.toggleMore = this.toggleMore.bind(this);
    this.isOpen = this.isOpen.bind(this);
    this.isOpenBut = this.isOpenBut.bind(this);
    this.createTask = this.createTask.bind(this);

    this.state = {
      items: {},
      open: false,
      members: {}
    };
  }

  componentWillMount(nextProps) {
    this.ref = base.syncState(`/items/${this.props.groupIndex}/`, {
      context: this,
      state: 'items'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
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

  addItem(item) {
    // update our state
    const items = { ...this.state.items };
    // add in our new Task
    const timestamp = Date.now();
    items[`item_${timestamp}`] = item;
    // set state
    this.setState({ items });
    route(`/team/${this.props.teamname}/board/${this.props.boardName}`, true);
  }

  createTask(event) {
    event.preventDefault();
    if (this.desc.value == '') {
      this.desc.value = 'This is a example description (Click to edit)';
    }
    const task = {
      desc: this.desc.value,
      p1: this.person1.value,
      p2: this.person2.value,
      p3: this.person3.value,
      p4: this.person4.value,
      status: this.status.value,
      finishGoal: this.goal.value,
      deadline: this.deadline.value,
      tooktime: this.tooktime.value,
      notes: this.notes.value
    }
    this.addItem(task)
  }

  render() {
    // const members = { ...this.state.members };
    // if (members[this.props.uid] !== true) {
    //   return (
    //     <div class={style.noPerm}>
    //       <h2>No acces</h2>
    //       <p>You don't have the needed permission to edit this task. Are you sure you are signed in to the right account?</p>
    //       <Link href={`/team/${this.props.teamname}/board/${this.props.boardName}/${this.props.groupIndex}/${this.props.itemIndex}`}>Go back</Link>
    //     </div>
    //   )
    // }
    return (
      <div class={style.itemOverview}>
        <div class={style.desc}>
          <span>Description</span>
          <textarea
            name="desc"
            ref={(input) => this.desc = input}
            placeholder="This is a example description (Click to edit)"
            required
          />
        </div>
        <div class={style.assigned}>
          <span>Assign people</span>
          <section>
            <i class="material-icons" onclick={() => this.toggleMore()}>{this.isOpenBut()}</i>
          </section>
          <section class={style.assignPeople} style={`max-height: ${this.isOpen()};`}>
            <label>Main person</label>
            <select
              ref={(input) => this.person1 = input}
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
            placeholder="dd/mm/yy"
          />
        </div>
        <div class={style.deadline}>
          <span>Deadline</span>
          <input
            type="text"
            ref={(input) => this.deadline = input}
            placeholder="dd/mm/yy"
          />
        </div>
        <div class={style.timeUsed}>
          <span>Time used</span>
          <input
            type="number"
            ref={(input) => this.tooktime = input}
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
          />
        </div>
        <a onclick={(e) => this.createTask(e)} class={style.edit}>Create task</a>
        <Link class={style.remove} href={`/team/${this.props.teamname}/board/${this.props.boardName}/${this.props.groupIndex}/${this.props.itemIndex}`}>Cancel</Link>
      </div>
    );
  }
}

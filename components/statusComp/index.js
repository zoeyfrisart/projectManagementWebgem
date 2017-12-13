import { h, Component } from 'preact';
import base from '../../base';
import moment from 'moment';

import style from './style';

export default class StatusComp extends Component {
  constructor() {
    super();
    this.calculateDayDeadline = this.calculateDayDeadline.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.renderEditMode = this.renderEditMode.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);

    this.state = {
      board: {},
      editMode: false
    };
  }

  componentWillMount(nextProps) {
    this.ref = base.syncState(`teams/${this.props.teamname}/boards/${this.props.boardName}`, {
      context: this,
      state: 'board'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  calculateDayDeadline() {
    let deadlineAway = moment(this.state.board.deadline, 'DD/MM/YY').fromNow();
    return deadlineAway;
  }

  updateBoard(updatedBoard) {
    let board = { ...this.state.board };
    board = updatedBoard;
    this.setState({ board });
  }

  handleChange(e) {
    const boardInfo = this.props.board;
    const updatedBoard = {
      ...boardInfo,
      [e.target.name]: e.target.value
    };
    this.updateBoard(updatedBoard);
  }

  toggleEdit() {
    if (this.state.editMode === true) {
      this.setState({ editMode: false });
    }
    else {
      this.setState({ editMode: true });
    }
  }

  renderEditMode() {
    return (
      <div class={style.statusComp}>
        <button onclick={this.toggleEdit} aria-label="edit" class={style.editButton}>
          <i class="material-icons">mode_edit</i>
        </button>
        <div class={style.row}>
          <div class={style.column}>
            <h2>{this.state.board.name}</h2><br />
            <input
              type="text"
              class={style.opdrachtgever}
              onChange={(e) => this.handleChange(e)}
              name="opdrachtgever"
              value={this.state.board.opdrachtgever}
              placeholder="name of client"
            />
          </div>
          <div class={style.column}>
            <h3 class={style.h3__column}>Deadline in</h3>
            <input
              type="text"
              class={style.deadlineEdit}
              onChange={(e) => this.handleChange(e)}
              name="deadline"
              value={this.state.board.deadline}
              placeholder="Deadline project dd/mm/yy"
            />
          </div>
          <div class={style.column}>
            <h3 class={style.h3__column}>Tasks</h3>
            <input
              type="text"
              class={style.opdrachtgever}
              onChange={(e) => this.handleChange(e)}
              name="totalOpdracht"
              value={this.state.board.totalOpdracht}
              placeholder="tasks."
            />
          </div>
        </div>
        <div class={style.row}>
          <div class={style.progBar}>
            <span class={style.cancelled} />
            <span class={style.toDo} />
            <span class={style.needHelp} />
            <span class={style.workNeeded} />
            <span class={style.workingOnIt} />
            <span class={style.readyForTesting} />
            <span class={style.done} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.editMode === true) {
      return <div class={style.edit}>{this.renderEditMode()}</div>;
    }
    return (
      <div class={style.statusComp}>
        <button onclick={this.toggleEdit} aria-label="edit" class={style.editButton}>
          <i class="material-icons">mode_edit</i>
        </button>
        <div class={style.row}>
          <div class={style.column}>
            <h2>{this.state.board.name}</h2><br />
            <h3>{this.state.board.opdrachtgever}</h3>
          </div>
          <div class={style.column}>
            <h3 class={style.h3__column}>Deadline in</h3>
            <span class={style.deadline}>{this.calculateDayDeadline()}</span>
          </div>
          <div class={style.column}>
            <h3 class={style.h3__column}>Tasks</h3>
            <span class={style.opAantal}>{this.state.board.totalOpdracht}</span>
          </div>
        </div>
        <div class={style.row}>
          <div class={style.progBar}>
            <span class={style.cancelled} />
            <span class={style.toDo} />
            <span class={style.needHelp} />
            <span class={style.workNeeded} />
            <span class={style.workingOnIt} />
            <span class={style.readyForTesting} />
            <span class={style.done} />
          </div>
        </div>
      </div>
    );
  }
}

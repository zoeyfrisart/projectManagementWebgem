import { h, Component } from 'preact';
import base from '../../base';
import moment from 'moment';

import circleStyle from './circle.css';
import style from './style';

export default class StatusComp extends Component {
  constructor() {
    super();
    this.calculateDayDeadline = this.calculateDayDeadline.bind(this);

    this.state = {
      board: {}
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
    let deadlineAway = moment(this.state.board.deadline, 'DD/MM/YY').fromNow(true);
    if ( deadlineAway.indexOf('ago') >= 0 && this.props.details.status !== 'Done'){
      return <span class={style.inPast}>{deadlineAway}</span>;
    }
    else if ( deadlineAway.indexOf('ago') >= 0){
      return <span class={style.inPastDone}>{deadlineAway}</span>;
    }
    else if (deadlineAway.indexOf('Invalid date') >= 0) {
      return false;
    }
    return deadlineAway;
  }
  render() {
    return (
      <div class={style.statusComp}>
        <div class={style.row}>
          <div class={style.column}>
            <h2>{this.state.board.name}</h2><br/>
            <h3>{this.state.board.opdrachtgever}</h3>
          </div>
          <div class={style.column}>
            <div class={[circleStyle.c100, circleStyle.p33, circleStyle.small, style.newCircle].join(' ')}>
              <span class={style.percentage}>12%</span>
                <div class={[circleStyle.slice, style.newSlice].join(' ')}>
                  <div class={[circleStyle.bar, style.newBar].join(' ')}></div>
                  <div class={[circleStyle.fill, style.newFill].join(' ')}></div>
                </div>
            </div>
          </div>
          <div class={style.column}>
            <h3 class={style.h3__column}>deadline in</h3>
            <span class={style.deadline}>{this.calculateDayDeadline()}</span>
          </div>
          <div class={style.column}>
            <h3 class={style.h3__column}>Totaal aantal opdrachten</h3>
            <span class={style.opAantal}>120</span>
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

import { h, Component } from 'preact';
import style from './style';
import SelectPerson from '../selectPerson';
import SelectStatus from '../selectStatus';
import moment from 'moment';

import trashIcon from '../../assets/img/trash-alt.svg';

export default class Item extends Component {
  constructor() {
    super();

    this.checkIfPast = this.checkIfPast.bind(this);
  }
  handleChange(e, key) {
    const item = this.props.details;
    const updatedOpdracht = {
      ...item,
      [e.target.name]: e.target.value
    };
    this.props.updateItem(key, updatedOpdracht);
  }

  checkIfPast() {
    let timeAg = moment(this.props.details.deadline, 'DD/MM/YY').fromNow();
    if ( timeAg.indexOf('ago') >= 0 && this.props.details.status !== 'Done'){
      return <span class={style.inPast}>{timeAg}</span>;
    }
    else if ( timeAg.indexOf('ago') >= 0){
      return <span class={style.inPastDone}>{timeAg}</span>;
    }
    else if (timeAg.indexOf('Invalid date') >= 0) {
      return false;
    }
    return timeAg;
  }


  render() {
    const details = this.props.details;
    const index = this.props.index;
    return (
      <tr class={style.tableRow}>
        <td style={`width: 25%; min-width: 300px;`}>
          <div class={style.innerWrap} style={`border-left: 3.5px solid ${this.props.color}`}>
            <div class={style.subRow}>
              <input
                class={style.inputDesc}
                name="desc"
                onChange={(e) => this.handleChange(e, this.props.index)}
                type="text"
                value={details.desc}
                placeholder="This is a example description (Click to edit)"
              />
            </div>
            <div class={style.subRow} />
          </div>
        </td>
        <td style={`min-width: 60px; width: 5%; max-width: 90px;`}>
          <div class={style.innerWrap}>
            <div class={style.subRow}>
              <SelectPerson
                personI={`p1`}
                index={this.props.index}
                details={this.props.details}
                updateItem={this.props.updateItem}
                teamname={this.props.teamname}
                boardName={this.props.boardName}
                groupI={this.props.groupI}
              />
            </div>
            <div class={style.subRow} >
              <p>{details.p1}</p>
            </div>
          </div>
        </td>
        <td style={`min-width: 35px; width: 5%; max-width: 60px;`}>
          <div class={style.innerWrap}>
            <div class={style.subRow}>
              <SelectPerson
                personI={`p2`}
                index={this.props.index}
                details={this.props.details}
                updateItem={this.props.updateItem}
                teamname={this.props.teamname}
                boardName={this.props.boardName}
                groupI={this.props.groupI}
              />
            </div>
            <div class={style.subRow} >
              <p>{details.p2}</p>
            </div>
          </div>
        </td>
        <td style={`min-width: 35px; width: 5%; max-width: 60px;`}>
          <div class={style.innerWrap}>
            <div class={style.subRow} >
              <SelectPerson
                personI={`p3`}
                index={this.props.index}
                details={this.props.details}
                updateItem={this.props.updateItem}
                teamname={this.props.teamname}
                boardName={this.props.boardName}
                groupI={this.props.groupI}
              />
            </div>
            <div class={style.subRow} >
              <p>{details.p3}</p>
            </div>
          </div>
        </td>
        <td style={`min-width: 35px; width: 5%; max-width: 60px;`}>
          <div class={style.innerWrap}>
            <div class={style.subRow}>
              <SelectPerson
                personI={`p4`}
                index={this.props.index}
                details={this.props.details}
                updateItem={this.props.updateItem}
                teamname={this.props.teamname}
                boardName={this.props.boardName}
                groupI={this.props.groupI}
              />
            </div>
            <div class={style.subRow} >
              <p>{details.p4}</p>
            </div>
          </div>
        </td>
        <td style={`min-width: 130px;`}>
          <div class={style.innerWrap}>
            <SelectStatus
              statusI={`status`}
              formId={`${details.in1d + 4}`}
              index={this.props.index}
              details={this.props.details}
              updateItem={this.props.updateItem}
              boardName={this.props.boardName}
              groupI={this.props.groupI}
            />
          </div>
        </td>
        <td style={`min-width: 100px;`}>
          <div class={style.innerWrap}>
            <div class={style.subRow} >
              <input
                autocomplete="nope"
                class={style.deadline}
                name="finishGoal"
                onChange={(e) => this.handleChange(e, this.props.index)}
                type="text"
                value={details.finishGoal}
                placeholder="dd/mm/yy"
              />
            </div>
            <div class={style.subRow} />
          </div>
        </td>
        <td style={`min-width: 100px;`}>
          <div class={style.innerWrap}>
            <div class={style.subRow} >
              <input
                autocomplete="nope"
                class={style.deadline}
                name="deadline"
                onChange={(e) => this.handleChange(e, this.props.index)}
                type="text"
                value={details.deadline}
                placeholder="dd/mm/yy"
              />
            </div>
            <div class={style.subRow}>
              <p>
                {
                  this.checkIfPast()
                }
              </p>
            </div>
          </div>
        </td>
        <td style={`min-width: 100px;`}>
          <div class={style.innerWrap}>
            <div class={style.subRow} >
              <input
                class={style.tookTime}
                name="tooktime"
                onChange={(e) => this.handleChange(e, this.props.index)}
                type="number"
                value={details.tooktime}
                placeholder="tijd in uren"
              />
            </div>
            <div class={style.subRow} />
          </div>
        </td>
        <td style={`width: 3%;`}>
          <div class={style.innerWrap}>
            <button class={style.deleteItem} onClick={() => this.props.removeItem(index)}>
              <img src={trashIcon} alt="delete" />
            </button>
          </div>
        </td>
      </tr>
    );
  }
}
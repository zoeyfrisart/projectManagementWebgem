import { h, Component } from 'preact';
import style from './style';
import SelectPerson from '../selectPerson';
import SelectStatus from '../selectStatus';

import trashIcon from '../../assets/img/trash-alt.svg';

export default class Item extends Component {
  handleChange(e, key) {
    const item = this.props.details;
    const updatedOpdracht = {
      ...item,
      [e.target.name]: e.target.value
    };
    this.props.updateItem(key, updatedOpdracht);
  }


  render() {
    const details = this.props.details;
    const index = this.props.index;
    return (
      <tr class={style.tableRow}>
        <td style={`width: 25%; min-width: 300px;`}>
          <div class={style.innerWrap} style={`border-left: 7.5px solid ${this.props.color}`}>
            <input
              class={style.inputDesc}
              name="desc"
              onChange={(e) => this.handleChange(e, this.props.index)}
              type="text"
              value={details.desc}
              placeholder="This is a example description (Click to edit)"
            />
          </div>
        </td>
        <td style={`min-width: 60px; width: 5%; max-width: 90px;`}>
          <div class={style.innerWrap}>
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
        </td>
        <td style={`min-width: 35px; width: 5%; max-width: 60px;`}>
          <div class={style.innerWrap}>
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
        </td>
        <td style={`min-width: 35px; width: 5%; max-width: 60px;`}>
          <div class={style.innerWrap}>
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
        </td>
        <td style={`min-width: 35px; width: 5%; max-width: 60px;`}>
          <div class={style.innerWrap}>
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
            <input
              autocomplete="nope"
              class={style.deadline}
              name="finishGoal"
              onChange={(e) => this.handleChange(e, this.props.index)}
              type="date"
              value={details.finishGoal}
              placeholder="dd/mm/yyyy"
            />
          </div>
        </td>
        <td style={`min-width: 100px;`}>
          <div class={style.innerWrap}>
            <input
              autocomplete="nope"
              class={style.deadline}
              name="deadline"
              onChange={(e) => this.handleChange(e, this.props.index)}
              type="date"
              value={details.deadline}
              placeholder="dd/mm/yyyy"
            />
          </div>
        </td>
        <td style={`min-width: 100px;`}>
          <div class={style.innerWrap}>
            <input
              class={style.tookTime}
              name="tooktime"
              onChange={(e) => this.handleChange(e, this.props.index)}
              type="number"
              value={details.tooktime}
              placeholder="000"
            />
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
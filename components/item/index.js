import { h, Component } from 'preact';
import style from './style';
import SelectPerson from '../selectPerson';
import SelectStatus from '../selectStatus';
import moment from 'moment';

import { getColor, getPrioColor, getImgSrc } from '../../helpers';

import trashIcon from '../../assets/img/trash-alt.svg';



export default class Item extends Component {
  constructor(props) {
    super(props);

    this.checkIfPast = this.checkIfPast.bind(this);
    this.checkIfAssigned = this.checkIfAssigned.bind(this);
    // this.StatusStyleMinal = this.StatusStyleMinal.bind(this);
    // this.PriorityStyleMinal = this.PriorityStyleMinal.bind(this);

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

  checkIfAssigned(personI) {
    if (personI === 'none') {
      return false;
    }
    return <img src={getImgSrc(personI)} alt="Assigned person profile pic" />;
  }

  render() {
    const details = this.props.details;
    const index = this.props.index;
    const userStyle = this.props.settings.style;

    let statusStyle = null;
    let priorityStyle = null;
    if (userStyle){
      statusStyle = <StatusStyleMinal details={details} />;
      priorityStyle = <PriorityStyleMinal details={details} />;
    }
    else {
      statusStyle = <StatusStyleVisual details={details} />;
      priorityStyle = <PriorityStyleVisual details={details} />;
    }
    return (
      /*<tr class={style.tableRow}>
        <td style={`width: 25%; min-width: 300px;`}>
          <div class={style.innerWrap} style={`border-left: 3.5px solid ${this.props.color}`}>
            <div class={style.subRow}>
              <textarea
                rows="2"
                class={style.inputDesc}
                name="desc"
                onChange={(e) => this.handleChange(e, this.props.index)}
                placeholder="This is a example description (Click to edit)"
              >
                {details.desc}
              </textarea>
            </div>
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
                placeholder="Time in hours"
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
      </tr> */
      <div class={style.itemWrap}>
        <p class={style.description}>{details.desc}</p>
        <div class={style.assigned} >
          {this.checkIfAssigned(details.p1)}
          {this.checkIfAssigned(details.p2)}
          {this.checkIfAssigned(details.p3)}
          {this.checkIfAssigned(details.p4)}
        </div>
        {statusStyle}
        {priorityStyle}
        <p class={style.deadline} >November 21, 2017</p>
      </div>
    );
  }
}

function StatusStyleMinal(props){
  return(
    <p class={style.statusMinimal} style={`--statusColor: ${getColor(props.details.status)}`}>{props.details.status}</p>
  );
}

function PriorityStyleMinal(props){
  return(
    <p class={style.priorityMinimal} style={`--priorityColor: ${getPrioColor(props.details.priority)}`}>{props.details.priority}</p>
  );
}

function StatusStyleVisual(props){
  return(
    <div class={style.status} style={`--statusColor: ${getColor(props.details.status)}`}>
      <p>{props.details.status}</p>
    </div>
  );
}

function PriorityStyleVisual(props){
  return(
    <div class={style.priority} style={`--priorityColor: ${getPrioColor(props.details.priority)}`} >
      <p>{props.details.priority}</p>
    </div>
  );
}
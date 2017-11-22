import { h, Component } from 'preact';
import base from '../../base';

import Item from '../item';
import AddItem from '../addItem';

import '@material/button/dist/mdc.button.min.css';
import style from './style';
// import dist from 'react-autosuggest';
import { BlockPicker } from 'react-color';

export default class BoardGroup extends Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.handleDeleteGroupItems = this.handleDeleteGroupItems.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);

    this.state = {
      items: {},
      displayColorPicker: false,
      color: this.props.details.color
    };
  }

  componentWillMount(nextProps) {
    this.ref = base.syncState(`/items/${this.props.index}/`, {
      context: this,
      state: 'items'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addItem(item) {
    // update our state
    const items = { ...this.state.items };
    // add in our new fish
    const timestamp = Date.now();
    items[`item_${timestamp}`] = item;
    // set state
    this.setState({ items });
  }

  updateItem(key, updatedOpdracht) {
    const items = { ...this.state.items };
    items[key] = updatedOpdracht;
    this.setState({ items });
  }

  handleChange(e, key) {
    const group = this.props.details;
    const updatedGroup = {
      ...group,
      [e.target.name]: e.target.value
    };
    this.props.updateGroup(key, updatedGroup);
  }

  removeItem = (key) => {
    const items = { ...this.state.items };
    items[key] = null;
    this.setState({ items });
  };

  handleColorClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleColorClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleColorChange = (color) => {
    this.setState({ color: color.hex });
    const group = this.props.details;
    const updatedGroup = {
      ...group,
      color: this.state.color
    };
    this.props.updateGroup(this.props.index, updatedGroup);
  };

  handleDeleteGroupItems() {
    let r = confirm(`You are about to delete ${this.props.details.name}. \nThis can't be undone! \nAre you sure you want to delete the board ${this.props.details.name}`);
    if (r === true) {
      base.remove(`/items/${this.props.index}`);
      this.props.removeGroup(this.props.index);
    }
  }

  render() {
    const details = this.props.details;
    return (
      <div class={style.groupWrap}>
        <table cellpadding="2" cellSpacing="2" class={style.group}>
          <thead class={style.tableHead} style={`display: table-header-group;`}>
            <tr>
              <th scope="row" style={`text-align: left; font-size: 22px; color: ${this.props.details.color}; width: 25%; min-width: 300px; margin: 0 1px 0 0; padding-left: 12px;`}>
                <input class={style.inputHeader} style={`color: ${this.props.details.color}`} name="name" onChange={(e) => this.handleChange(e, this.props.index)} type="text" value={details.name} placeholder="This is a example header (Click to edit)" />
              </th>
            </tr>
            <tr class={style.tableH}>
              {/* <th scope="row" style={`text-align: left; font-size: 18px; color: ${this.props.details.color}; width: 25%; min-width: 300px; margin: 0 1px 0 0;`}>
                <input class={style.inputHeader} style={`color: ${this.props.details.color}`} name="name" onChange={(e) => this.handleChange(e, this.props.index)} type="text" value={details.name} placeholder="This is a example header (Click to edit)" />
              </th> */}
              <th style={`width: 25%; min-width: 300px;`}>Task</th>
              <th style={`width: 5%; min-width: 60px; max-width: 90px;`}>Made by</th>
              <th style={`width: 5%; min-width: 35px; max-width: 60px;`}>p2</th>
              <th style={`width: 5%; min-width: 35px; max-width: 60px;`}>p3</th>
              <th style={`width: 5%; min-width: 35px; max-width: 60px;`}>p4</th>
              <th style={`min-width: 130px;`}>Status</th>
              <th style={`min-width: 100px;`}>Goal</th>
              <th style={`min-width: 100px`}>Deadline</th>
              <th style={`min-width: 100px;`}>Time used</th>
              <th style={`width: 3%;`}>delete</th>
            </tr>
          </thead>
          <tbody class={style.tableBody} style={`display: table-row-group;`}>
            {
              Object
                .keys(this.state.items)
                .map(key => <Item key={key} index={key} updateItem={this.updateItem} details={this.state.items[key]} teamname={this.props.teamname} color={this.props.details.color} members={this.props.members} boardName={this.props.boardName} groupI={this.props.index} removeItem={this.removeItem} />)
            }
            <tr>
              <td colspan="5" class={style.tdAddItem}>
                <AddItem addItem={this.addItem} />
              </td>
              <td colspan="2" />
              <td colspan="1" class={style.tdAddItem}>
                <div class={style.wrapColor}>
                  <div class={style.swatch} onClick={this.handleColorClick} >
                    <div class={style.color} style={`background: ${this.state.color}`}>
                        group color
                    </div>
                  </div>
                  {this.state.displayColorPicker ? <div class={style.popover}>
                    <div class={style.cover} onClick={this.handleColorClose} />
                    <BlockPicker
                      width="auto"
                      triangle="hide"
                      color={this.state.color}
                      onChange={this.handleColorChange}
                      colors={['#F47373', '#697689', '#37D67A', '#2CCCE4', '#ff8a65', '#ba68c8' ,'#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#EF79EC', '#009688', '#4caf50', '#ffc107']}
                    />
                  </div> : null}
                </div>
              </td>
              <td colspan="2" class={style.tdAddItem}>
                <button style={`width: 100%; display: flex; justify-content: center; background-color: #f44336;`} className={`mdc-button mdc-button--raised`} onClick={this.handleDeleteGroupItems}>Delete group</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

import { h, Component } from 'preact';
import { BlockPicker } from 'react-color';
import Textfield from 'preact-material-components/Textfield';
import 'preact-material-components/Textfield/style.css';
import style from './style';

export default class NewGroup extends Component {
  state = {
    displayColorPicker: false,
    color: '#f47373'
  }

  // handleTest = (event) => {
  //   console.log(this.value);
  // }

  createGroup(event) {
    event.preventDefault();
    const group = {
      name: this.name.value,
      color: this.state.color
    };
    this.props.addGroup(group);
    this.addGroupForm.reset();
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    this.setState({ color: color.hex });
  };

  render() {
    return (
      <div class={style.newGroup}>
        <h3 class={style.newGroupH3} style={`color: ${this.state.color}`}>new group</h3>
        <form ref={input => (this.addGroupForm = input)} class={style.newGroupForm} onSubmit={(e) => this.createGroup(e)}>
          <input required ref={input => (this.name = input)} type="text" placeholder="Name of the new group" />
          <div class={style.wrapColor}>
            <div class={style.swatch} onClick={this.handleClick} >
              <div class={style.color} style={`background: ${this.state.color}`}>
                group color
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
        </form>
      </div>
    );
  }
}
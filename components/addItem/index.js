import { h, Component } from 'preact';
import style from './style';

export default class AddItem extends Component{
  addItem(event) {
    event.preventDefault();
    const timestamp = Date.now();
    const item = {
      desc: this.name.value,
      p1: `none`,
      p2: `none`,
      p3: `none`,
      p4: `none`,
      status: `To do`
    };
    this.props.addItem(item);
    this.addItemForm.reset();
  }
  render() {
    return (
      <div class={style.newItem}>
        <form ref={input => (this.addItemForm = input)} class={style.newItemForm} onSubmit={(e) => this.addItem(e) }>
          <input required ref={input => (this.name = input)} type="text" placeholder="Description of task" />
        </form>
      </div>
    );
  }
}

AddItem.propTypes = {
  addItem: Component.PropTypes.func.isRequired
};
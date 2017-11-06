import { h, Component } from 'preact';
import style from './style';

export default class NewBoard extends Component{
  createBoard(event) {
    event.preventDefault();
    const board = {
      name: this.name.value,
    };
    this.props.addBoard(board);
    this.addBoardForm.reset();
  }
  render() {
    return (
      <div class={style.newboard}>
        <form ref={input => (this.addBoardForm = input)} class={style.newboardForm} onSubmit={(e) => this.createBoard(e) }>
          <input required ref={input => (this.name = input)} type="text" placeholder="board name" />
          <button type="submit" className="material-icons">add</button>
        </form>
      </div>
    );
  }
}

NewBoard.propTypes = {
  addBoard: Component.PropTypes.func.isRequired
};
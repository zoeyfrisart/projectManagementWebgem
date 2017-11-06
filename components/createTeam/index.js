import { h, Component } from 'preact';
import style from './style';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';

export default class CreateTeam extends Component {
  createTeam(event) {
    event.preventDefault();
    const team = {
      name: this.name.value,
      members: {
        [this.props.uuid]: true
      }
    };
    this.props.addTeam(team);
    this.createTeamForm.reset();
  }
  render() {
    return (
      <div class={style.cardWrap}>
        <Card>
          <Card.Primary>
            <div class={style.cardBackcolor} style={`background: ${this.state.background}`}>
              <Card.Title>new team</Card.Title>
            </div>
          </Card.Primary>
          <Card.Actions>
            <form ref={input => (this.createTeamForm = input)} class={style.newTeamForm} onSubmit={(e) => this.createTeam(e)}>
              <input class={style.teamInput} required ref={input => (this.name = input)} type="text" placeholder="team name" />
              <button class={style.buttonSubmit} type="submit">create team</button>
            </form>
          </Card.Actions>
        </Card>
      </div>
    );
  }
}
import { h, Component } from 'preact';
import style from './style';
import base from '../../base';
import TeamCard from '../../components/teamCard';
import CreateTeam from '../../components/createTeam';

export default class Settings extends Component {
  constructor() {
    super();

    this.removeTeam = this.removeTeam.bind(this);
    this.addTeam = this.addTeam.bind(this);
  }

  state = {
    teams: {}
  }

  componentWillMount(nextProps, nextState){
    this.ref = base.syncState(`users/${this.props.uuid}/teams`, {
      context: this,
      state: 'teams'
    });
  }


  componentWillUpdate(nextProps, nextState){
    this.ref = base.syncState(`users/${this.props.uuid}/teams`, {
      context: this,
      state: 'teams'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  removeTeam = (key) => {
    const teams = { ...this.state.teams };
    teams[key] = null;
    this.setState({ teams });
    base.remove(`teams/${key}/members/${this.props.uuid}`);
  };

  addTeam(team) {
    // update our state
    const teams = { ...this.state.teams };
    // Add in our team
    teams[team.name] = true;
    // set state
    this.setState({ teams });
  }

  render() {
    return (
      <div class={style.content}>
        <h2>teams</h2>
        <div class={style.teamsContent}>
          {
            Object
              .keys(this.state.teams)
              .map(key => <TeamCard removeTeam={this.removeTeam} key={key} index={key} />)
          }
          <CreateTeam uuid={this.props.uuid} addTeam={this.addTeam} />
        </div>
      </div>
    );
  }
}
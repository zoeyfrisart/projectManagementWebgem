import { h, Component } from 'preact';
import ConfirmLeave from '../confirmLeave';
import style from './style';
import Card from 'preact-material-components/Card';
import { Link } from 'preact-router';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

export default class TeamCard extends Component {
  constructor() {
    super();

    const colors = ['#F47373', '#697689', '#37D67A', '#2CCCE4', '#ff8a65', '#ba68c8', '#e91e63', '#673ab7', '#3f51b5', '#2196f3', '#009688', '#ffc107'];
    this.state = {
      background: colors[Math.floor(12 * Math.random())]
    };
  }
  render() {
    return (
      <div class={style.cardWrap}>
        <Card>
          <Card.Primary>
            <div class={style.cardBackcolor} style={`background: ${this.state.background}`}>
              <Card.Title>{this.props.index}</Card.Title>
            </div>
          </Card.Primary>
          <Card.Actions>
            <ConfirmLeave team={this.props.index} handleLeave={this.props.removeTeam} />
            <Link href={`/team/${this.props.index}`} class={style.linkCard}>
              <Card.Action>
                show
              </Card.Action>
            </Link>
          </Card.Actions>
        </Card>
      </div>
    );
  }
}

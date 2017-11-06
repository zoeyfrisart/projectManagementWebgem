import { h, Component } from 'preact';
import Dialog from 'preact-material-components/Dialog';
import Button from 'preact-material-components/Button';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Dialog/style.css';
import style from './style.css';

export default class ConfirmLeave extends Component {
  constructor() {
    super();
    this.handleAccept = this.handleAccept.bind(this);
  }

  handleAccept() {
    this.props.handleLeave(this.props.team);
  }
  render(){
    return (
      <div class={style.leaveButton}>
        <Button style={`background: #f44336; width: 100%; color: white;`} onClick={() => {
          this.scrollingDlg.MDComponent.show();
        }}>
          leave
        </Button>
        <Dialog ref={scrollingDlg=>{this.scrollingDlg=scrollingDlg;}} onAccept={this.handleAccept}>
          <Dialog.Body>
            <p>You are about to leave the team {this.props.team}!</p>
            <p>Are you sure you want to leave {this.props.team}?</p>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.FooterButton cancel={true}>cancel</Dialog.FooterButton>
            <Dialog.FooterButton accept={true}>leave team</Dialog.FooterButton>
          </Dialog.Footer>
        </Dialog>
      </div>
    );
  }
}
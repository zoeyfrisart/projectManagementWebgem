import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import Header from '../../components/header/index';

export default class Home extends Component {
  render() {
    return (
      <div class={style.home}>
        <Header
          uid={this.props.uid}
          username={this.props.username}
          userProfilePic={this.props.userProfilePic}
          logout={this.props.logout}
          hidden={this.props.hidden}
          title={this.props.title}
        />
        <div class={style.main}>
          <div class={style.maindesc}>
            <h1 class={style.homeH1}>Project management <br />reinvented.</h1>
            <p class={style.homeP1}>A project management tool that is aimed to be visually pleasing.</p>
            <Link role="button" href="/login" class={style.button}>sign up</Link>
            <Link role="button" href="/team/Example/board/board-1511521540685" class={style.button}>live demo</Link>
          </div>
          <div class={style.sideImg}>
            <img
              src="https://20578.tk/board/background-pics/boardshowcase@0,1x.jpg"
              srcset="
                https://20578.tk/board/background-pics/boardshowcase@0,1x.jpg 400w,
                https://20578.tk/board/background-pics/boardshowcase@0,25x.jpg 1000w,
              https://20578.tk/board/background-pics/boardshowcase@0,5x.jpg 2000w,
                https://20578.tk/board/background-pics/boardshowcase@0,75x.jpg 3000w
              "
              sizes="
                (max-width: 1024px) 80vw,
                56vw
              "
              alt="Showcase of project management tool."
            />
          </div>
        </div>
        <div class={style.secondary}>
          <div class={style.column}>
            <i class="material-icons" style="color: #0077C2; font-size: 90px">autorenew</i>
            <h2>realtime</h2>
            <p>Updates realtime on all clients. See changes instantly, to prevent communication issues.</p>
          </div>
          <div class={style.column}>
            <i class="material-icons" style="color: #0077C2; font-size: 90px">invert_colors</i>
            <h2>design</h2>
            <p>Visually pleasing, get a good overview of what is being worked on and what needs to be done.</p>
          </div>
          <div class={style.column}>
            <i class="material-icons" style="color: #0077C2; font-size: 90px">trending_up</i>
            <h2>do more</h2>
            <p>Get more work done by better project management. Know what people are working and what needs to be done.</p>
          </div>
        </div>
        <div role="footer" class={style.footer}>
          <a href="https://github.com/yannick1691/projectManagementWebgem" target="_blank" rel="noopener noreferrer" aria-label="Link to the Github project page.">
            <i class="fa fa-github" aria-hidden="true" ></i>
          </a>
          <a href="https://twitter.com/niceyannick" target="_blank" rel="noopener noreferrer" aria-label="Link to Twitter of NiceYannick.">
            <i class="fa fa-twitter" aria-hidden="true"></i>
          </a>
          <a href="https://www.linkedin.com/in/yannick-frisart/" target="_blank" rel="noopener noreferrer" aria-label="Link to LinkedIn of Yannick Frisart.">
            <i class="fa fa-linkedin" aria-hidden="true"></i>
          </a>
          <p><i class="fa fa-copyright" aria-hidden="true"></i> 2017 - 2018 Yannick Frisart - All rights reserved.</p>
        </div>
      </div>
    );
  }
}

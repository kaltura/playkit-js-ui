//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/shell';
import BaseComponent from '../base';
import Icon from '../icon/icon';

const mapStateToProps = state => ({
  prePlayback: state.shell.prePlayback
});

@connect(mapStateToProps, bindActions(actions))
class PrePlaybackPlayOverlay extends BaseComponent {

  constructor(obj: IControlParams) {
    super({name: 'PrePlaybackPlayOverlay', player: obj.player});

    this.player.addEventListener(this.player.Event.PLAY, () => {
      if (this.props.prePlayback) {
        this.props.updatePrePlayback(false);
        this.props.removePlayerClass('pre-playback');
      }
    });
  }

  componentWillMount() {
    this.props.addPlayerClass('pre-playback');
  }

  handleClick() {
    this.player.play();
  }

  render(props) {
    if (!props.prePlayback) return undefined;

    return (
      <div className='pre-playback-play-overlay' onClick={() => this.handleClick()}>
        <a className='pre-playback-play-button'><Icon type='play' /></a>
      </div>
    )
  }
}

export default PrePlaybackPlayOverlay;

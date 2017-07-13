//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/shell';
import BaseComponent from '../base';
import Icon from '../icon';

const mapStateToProps = state => ({
  prePlayback: state.shell.prePlayback,
  metadataLoaded: state.engine.metadataLoaded
});

@connect(mapStateToProps, bindActions(actions))
class PrePlaybackPlayOverlay extends BaseComponent {

  constructor(obj: Object) {
    super({name: 'PrePlaybackPlayOverlay', player: obj.player});

    this.player.addEventListener(this.player.Event.PLAY, () => {
      if (this.props.prePlayback) {
        this.props.updatePrePlayback(false);
        this.props.removePlayerClass('pre-playback');
      }
    });
    this.player.addEventListener(this.player.Event.LOADED_METADATA, () => {
      this.props.addPlayerClass('pre-playback');
    });
  }

  componentWillUnmount() {
    this.props.updatePrePlayback(false);
    this.props.removePlayerClass('pre-playback');
  }

  handleClick() {
    this.player.play();
  }

  render(props: any) {
    if (!props.prePlayback || !props.metadataLoaded) return undefined;

    return (
      <div className='pre-playback-play-overlay' onClick={() => this.handleClick()}>
        <a className='pre-playback-play-button'><Icon type='play' /></a>
      </div>
    )
  }
}

export default PrePlaybackPlayOverlay;

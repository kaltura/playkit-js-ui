//@flow
import { h } from 'preact';
import { Localizer, Text } from 'preact-i18n';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/play-pause';
import BaseComponent from '../base';
import { default as Icon, IconType } from '../icon';

const mapStateToProps = state => ({
  isPlaying: state.engine.isPlaying,
  adBreak: state.engine.adBreak,
  adIsPlaying: state.engine.adIsPlaying,
  isEnded: state.engine.isEnded
});

@connect(mapStateToProps, bindActions(actions))
class PlayPauseControl extends BaseComponent {

  constructor(obj: Object) {
    super({name: 'PlayPause', player: obj.player});
  }

  togglePlayPause() {
    this.logger.debug('Toggle play');
    this.isPlayingAdOrPlayback() ? this.player.pause() : this.player.play();
  }

  isPlayingAdOrPlayback() {
    return (this.props.adBreak && this.props.adIsPlaying) || (!this.props.adBreak && this.props.isPlaying);
  }

  render(props) {
    var controlButtonClass = this.isPlayingAdOrPlayback() ? 'control-button is-playing' : 'control-button';

    return (
      <div className='control-button-container control-play-pause'>
        <Localizer>
          <button
            aria-label={<Text id={this.isPlayingAdOrPlayback() ? 'controls.pause' : 'controls.play'} />}
            className={controlButtonClass}
            onClick={() => this.togglePlayPause()}
          >
            {props.isEnded ? <Icon type={IconType.Startover} /> : (
              <div>
                <Icon type={IconType.Play} />
                <Icon type={IconType.Pause} />
              </div>
            )}

          </button>
        </Localizer>
      </div>
    )
  }
}

export default PlayPauseControl;

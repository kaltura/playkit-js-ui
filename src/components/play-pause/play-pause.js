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
  isEnded: state.engine.isEnded
});

@connect(mapStateToProps, bindActions(actions))
class PlayPauseControl extends BaseComponent {

  constructor(obj: Object) {
    super({name: 'PlayPause', player: obj.player});
  }

  togglePlayPause() {
    this.logger.debug('Toggle play');
    if (this.player.paused) {
      this.player.play();
    }
    else {
      this.player.pause();
    }
  }

  render(props) {
    var controlButtonClass;
    if (props.isPlaying) {
      controlButtonClass = 'control-button is-playing';
    } else {
      controlButtonClass = 'control-button';
    }

    return (
      <div className='control-button-container control-play-pause'>
        <Localizer>
          <button
            aria-label={<Text id={props.isPlaying ? 'controls.pause' : 'controls.play'} />}
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

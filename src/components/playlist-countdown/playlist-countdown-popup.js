//@flow
import {h, Component} from 'preact';
import {KeyMap} from 'utils/key-map';
import style from '../../styles/style.scss';
import {Localizer, Text} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';

/**
 * PlaylistCountdownPopup component - the visual popup window on the bottom right
 * @class PlaylistCountdownPopup
 * @extends {Component}
 */
class PlaylistCountdownPopup extends Component {
  className: Array<string> = [style.playlistCountdown, style.hidden];
  el: HTMLElement;

  /**
   * after component mounted, remove hidden class so animation will start and focus for keyboard a11y
   * @returns {void}
   * @memberof PlaylistCountdownPopup
   */
  componentDidMount() {
    this.className = [style.playlistCountdown];
    if (this.el) {
      this.el.focus();
    }
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof PlaylistCountdownPopup
   */
  render(props: any) {
    return (
      <div
        role="button"
        aria-labelledby="playlistCountdownTextId"
        ref={el => (this.el = el)}
        tabIndex="0"
        className={this.className.join(' ')}
        onKeyDown={e => {
          switch (e.keyCode) {
            case KeyMap.ENTER:
              props.onClick();
              break;
            case KeyMap.ESC:
              props.cancelNext(e);
              break;
          }
        }}
        onClick={() => props.onClick()}>
        <div className={style.playlistCountdownPoster} style={`background-image: url(${props.next.sources.poster});`} />
        <div className={style.playlistCountdownContentPlaceholder}>
          <div className={style.playlistCountdownContentBackground}>
            <div className={style.playlistCountdownContent}>
              <Localizer>
                <div id="playlistCountdownTextId" className={style.playlistCountdownText}>
                  <div className={style.playlistCountdownTextTitle}>
                    <Text id="playlist.up_next" />
                  </div>
                  <div className={style.playlistCountdownTextName}>{`${props.next.sources.metadata ? props.next.sources.metadata.name : ''}`}</div>
                </div>
              </Localizer>
              <div className={[style.controlButtonContainer, style.playlistCountdownCancel].join(' ')}>
                <Localizer>
                  <button
                    tabIndex="0"
                    aria-label={<Text id="playlist.cancel" />}
                    className={[style.controlButton, style.playlistCountdownCancelButton].join(' ')}
                    onClick={e => props.cancelNext(e)}
                    onKeyDown={e => {
                      if (e.keyCode === KeyMap.ENTER) {
                        props.cancelNext(e);
                      }
                    }}>
                    <Icon type={IconType.Close} />
                  </button>
                </Localizer>
              </div>
              <div className={style.playlistCountdownIndicatorBar}>
                <div className={style.playlistCountdownIndicatorProgress} style={{width: props.progressWidth}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export {PlaylistCountdownPopup};

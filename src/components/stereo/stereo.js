//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from "../../utils/key-map";

/**
 * StereoControl component
 *
 * @class StereoControl
 * @example <StereoControl/>
 * @extends {BaseComponent}
 */
class StereoControl extends BaseComponent {

  /**
   * Creates an instance of StereoControl.
   * @memberof StereoControl
   */
  constructor() {
    super({name: 'Stereo'});
  }

  /**
   * Stereo click handler
   *
   * @returns {void}
   * @memberof StereoControl
   */
  onClick(): void {
    this.notifyClick({});
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof StereoControl
   */
  render(): React$Element<any> | void {
    return (
      <div className={[style.controlButtonContainer, style.controlStereo].join(' ')}>
        <Localizer>
          <button
            tabIndex="0"
            aria-label={<Text id={'controls.stereo'}/>}
            className={`${style.controlButton}`}
            onClick={() => this.onClick()}
            onKeyDown={(e) => {
              if (e.keyCode === KeyMap.ENTER) {
                this.onClick();
              }
            }}>
            <Icon type={IconType.Stereo}/>
          </button>
        </Localizer>
      </div>
    )
  }
}

export {StereoControl};

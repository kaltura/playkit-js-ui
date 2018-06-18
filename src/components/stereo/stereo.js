//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from "../../utils/key-map";
import {actions as stereoActions} from "../../reducers/stereo";
import {bindActions} from "../../utils/bind-actions";
import {connect} from "preact-redux";
import {actions} from "../../reducers/shell";

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  stereoMode: state.stereo.stereoMode
});

@connect(mapStateToProps, bindActions(Object.assign({}, actions, stereoActions)))
/**
 * StereoControl component
 *
 * @class StereoControl
 * @example <StereoControl/>
 * @extends {BaseComponent}
 */
class StereoControl extends BaseComponent {
  /**
   * @static
   * @type {string} - Component display name
   */
  static displayName = 'stereo';
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
    this.notifyClick();
    this.props.updateStereoMode(!this.props.stereoMode);
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
            className={this.props.stereoMode ? [style.controlButton, style.stereoMode].join(' ') : style.controlButton}
            onClick={() => this.onClick()}
            onKeyDown={(e) => {
              if (e.keyCode === KeyMap.ENTER) {
                this.onClick();
              }
            }}>
            <Icon type={IconType.Stereo}/>
            <Icon type={IconType.StereoFull}/>
          </button>
        </Localizer>
      </div>
    )
  }
}

export {StereoControl};

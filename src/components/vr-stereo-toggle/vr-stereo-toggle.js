//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from "../../utils/key-map";
import {actions as engineActions} from "../../reducers/engine";
import {bindActions} from "../../utils/bind-actions";
import {connect} from "preact-redux";
import {actions} from "../../reducers/shell";

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  vrStereoMode: state.engine.vrStereoMode,
  config: state.config.components.vrStereo
});

@connect(mapStateToProps, bindActions(Object.assign({}, actions, engineActions)))
/**
 * VrStereoToggleControl component
 *
 * @class VrStereoToggleControl
 * @example <VrStereoToggleControl player={this.player}/>
 * @extends {BaseComponent}
 */
class VrStereoToggleControl extends BaseComponent {
  /**
   * @static
   * @type {string} - Component display name
   */
  static displayName = 'vrStereo';
  /**
   * Creates an instance of VrStereoToggleControl.
   * @param {Object} obj obj
   * @memberof VrStereoToggleControl
   */
  constructor(obj: Object) {
    super({name: VrStereoToggleControl.displayName, player: obj.player});
  }

  /**
   * Vr-Stereo click handler
   *
   * @returns {void}
   * @memberof VrStereoToggleControl
   */
  onClick(): void {
    this.player.toggleVrStereoMode();
    this.props.updateVrStereoMode(!this.props.vrStereoMode);
  }

  componentWillMount(): void {
    this.props.updateVrStereoMode(this.props.config.vrStereoMode);
  }
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof VrStereoToggleControl
   */
  render(): React$Element<any> | void {
    return (
      <div className={[style.controlButtonContainer, style.controlVrStereo].join(' ')}>
        <Localizer>
          <button
            tabIndex="0"
            aria-label={<Text id={'controls.vrStereo'}/>}
            className={this.props.vrStereoMode ? [style.controlButton, style.vrStereoMode].join(' ') : style.controlButton}
            onClick={() => this.onClick()}
            onKeyDown={(e) => {
              if (e.keyCode === KeyMap.ENTER) {
                this.onClick();
              }
            }}>
            <Icon type={IconType.vrStereo}/>
            <Icon type={IconType.vrStereoFull}/>
          </button>
        </Localizer>
      </div>
    )
  }
}

export {VrStereoToggleControl};

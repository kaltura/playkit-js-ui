//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {actions as engineActions} from '../../reducers/engine';
import {bindActions} from '../../utils/bind-actions';
import {connect} from 'preact-redux';
import {actions as shellActions} from '../../reducers/shell';
import {withPlayer} from '../player';
import {withLogger} from 'components/logger';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isVr: state.engine.isVr,
  vrStereoMode: state.engine.vrStereoMode,
  config: state.config.components.vrStereo
});

const COMPONENT_NAME = 'VrStereo';

@connect(
  mapStateToProps,
  bindActions({...shellActions, ...engineActions})
)
@withPlayer
@withLogger(COMPONENT_NAME)
/**
 * VrStereo component
 *
 * @class VrStereo
 * @example <VrStereo />
 * @extends {Component}
 */
class VrStereo extends Component {
  /**
   * should render component
   * @returns {boolean} - whether to render the component
   */
  _shouldRender(): boolean {
    const componentConfig = this.props.config;
    return this.props.isVr && !(Object.keys(componentConfig).length === 0 && componentConfig.constructor === Object);
  }
  /**
   * Vr-Stereo click handler
   *
   * @returns {void}
   * @memberof VrStereo
   */
  onClick(): void {
    this.props.player.toggleVrStereoMode();
    this.props.updateVrStereoMode(!this.props.vrStereoMode);
  }

  /**
   * before component mounted, set initial state
   *
   * @returns {void}
   * @memberof VrStereo
   */
  componentWillMount(): void {
    this.props.updateVrStereoMode(this.props.config.vrStereoMode);
  }
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof VrStereo
   */
  render(): React$Element<any> | void {
    if (!this._shouldRender()) {
      return undefined;
    }
    return (
      <div className={[style.controlButtonContainer, style.controlVrStereo].join(' ')}>
        <Localizer>
          <button
            tabIndex="0"
            aria-label={<Text id={'controls.vrStereo'} />}
            className={this.props.vrStereoMode ? [style.controlButton, style.vrStereoMode].join(' ') : style.controlButton}
            onClick={() => this.onClick()}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                this.onClick();
              }
            }}>
            <Icon type={IconType.vrStereo} />
            <Icon type={IconType.vrStereoFull} />
          </button>
        </Localizer>
      </div>
    );
  }
}

VrStereo.displayName = COMPONENT_NAME;
export {VrStereo};

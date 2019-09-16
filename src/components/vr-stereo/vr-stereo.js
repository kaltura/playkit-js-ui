//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {actions as engineActions} from '../../reducers/engine';
import {bindActions} from '../../utils/bind-actions';
import {connect} from 'preact-redux';
import {actions} from '../../reducers/shell';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  vrStereoMode: state.engine.vrStereoMode,
  config: state.config.components.vrStereo
});

const COMPONENT_NAME = 'VrStereo';

@connect(
  mapStateToProps,
  bindActions(Object.assign({}, actions, engineActions))
)
/**
 * VrStereo component
 *
 * @class VrStereo
 * @example <VrStereo player={this.player}/>
 * @extends {BaseComponent}
 */
class VrStereo extends BaseComponent {
  /**
   * should render component
   * @param {*} props - component props
   * @returns {boolean} - whether to render the component
   * @static
   */
  static shouldRender(props: any): boolean {
    const componentConfig = props.config.components['vrStereo'];
    return props.state.engine.isVr && !(Object.keys(componentConfig).length === 0 && componentConfig.constructor === Object);
  }
  /**
   * Creates an instance of VrStereo.
   * @param {Object} obj obj
   * @memberof VrStereo
   */
  constructor(obj: Object) {
    super({name: COMPONENT_NAME, player: obj.player});
  }

  /**
   * Vr-Stereo click handler
   *
   * @returns {void}
   * @memberof VrStereo
   */
  onClick(): void {
    this.player.toggleVrStereoMode();
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

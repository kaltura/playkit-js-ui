import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {Text, withText} from 'preact-i18n';
import {Icon, IconType} from '../icon';
import {withEventDispatcher} from '../event-dispatcher';
import {Tooltip} from '../tooltip';
import {Button} from '../button';
import {connect} from 'react-redux';
import {ButtonControl} from '../button-control';
import {bindActions} from '../../utils';
import {actions} from '../../reducers/settings';

const COMPONENT_NAME = 'AdvancedAudioDesc';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  showAdvancedAudioDescToggle: state.config.settings.showAdvancedAudioDescToggle
});

/**
 * AdvancedAudioDesc component
 *
 * @class AdvancedAudioDesc
 * @example <AdvancedAudioDesc step={5} />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(actions))
@withEventDispatcher(COMPONENT_NAME)
@withText({AdvancedAudioDescText: 'settings.advancedAudioDescription'})
class AdvancedAudioDesc extends Component<any, any> {
  constructor(props: any) {
    super();
    this.state = {toggle: false};
  }

  /**
   * should render component
   * @returns {boolean} - whether to render the component
   */
  _shouldRender(): boolean {
    return this.props.showAdvancedAudioDescToggle;
  }
  /**
   * AdvancedAudioDesc click handler
   *
   * @returns {void}
   * @memberof AdvancedAudioDesc
   */
  onClick = (): void => {
    this.setState(state => {
      this.props.updateAdvancedAudioDesc(!state.toggle);
      this.props.notifyClick({type: 'AdvancedAudioDescription', checked: !state.toggle});
      return {
        toggle: !state.toggle
      };
    });
  };

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof AdvancedAudioDesc
   */
  render({AdvancedAudioDescText, innerRef}: any): VNode<any> | undefined {
    return !this._shouldRender() ? undefined : (
      <ButtonControl name={COMPONENT_NAME} className={style.noIdleControl}>
        <Tooltip label={AdvancedAudioDescText}>
          <Button tabIndex="0" aria-label={AdvancedAudioDescText} className={`${style.controlButton}`} ref={innerRef} onClick={this.onClick}>
            <Icon type={this.state.toggle ? IconType.AdvancedAudioDescriptionActive : IconType.AdvancedAudioDescription} />
          </Button>
        </Tooltip>
      </ButtonControl>
    );
  }
}

AdvancedAudioDesc.displayName = COMPONENT_NAME;
export {AdvancedAudioDesc};

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
import {IconComponent, registerToBottomBar} from '../bottom-bar';
import {redux} from '../../index';
import {withPlayer} from '../player';

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
@withPlayer
@withEventDispatcher(COMPONENT_NAME)
@withText({AdvancedAudioDescText: 'settings.advancedAudioDescription'})
class AdvancedAudioDesc extends Component<any, any> implements IconComponent {
  constructor(props: any) {
    super();
    this.state = {toggle: false};
    registerToBottomBar(COMPONENT_NAME, props.player, () => this.registerComponent());
  }

  registerComponent(): any {
    return {
      ariaLabel: () => this.getComponentText(),
      displayName: COMPONENT_NAME,
      order: 5,
      svgIcon: () => this.getSvgIcon(),
      onClick: () => this.onClick(),
      component: () => {
        return getComponent({...this.props, classNames: [style.upperBarIcon]});
      },
      shouldHandleOnClick: false
    };
  }

  getComponentText = (): any => {
    return this.props.AdvancedAudioDescText;
  }

  getSvgIcon = (): any => {
    return {
      type: redux.useStore().getState().settings.advancedAudioDesc ? IconType.AdvancedAudioDescriptionActive : IconType.AdvancedAudioDescription
    };
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
      <ButtonControl name={COMPONENT_NAME} className={[style.noIdleControl, this.props.classNames ? this.props.classNames.join(' ') : ''].join(' ')}>
        <Tooltip label={AdvancedAudioDescText}>
          <Button tabIndex="0" aria-label={AdvancedAudioDescText} className={`${style.controlButton}`} ref={innerRef} onClick={this.onClick}>
            <Icon type={this.state.toggle ? IconType.AdvancedAudioDescriptionActive : IconType.AdvancedAudioDescription} />
          </Button>
        </Tooltip>
      </ButtonControl>
    );
  }
}

const getComponent = (props: any): VNode => {
  return <AdvancedAudioDesc {...props} />;
}

AdvancedAudioDesc.displayName = COMPONENT_NAME;
export {AdvancedAudioDesc};
